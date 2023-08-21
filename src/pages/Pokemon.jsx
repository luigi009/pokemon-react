import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "../components/Loading";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const { name } = useParams();

  //Function to get the character of each pokemon
  const getPokemon = useCallback(async () => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    setPokemon(data);
  }, [name]);

  useEffect(() => {
    getPokemon();
  }, [name, getPokemon]);

  //Funciton when click in the favorite button change the color of the icon
  const [favorite, setFavorite] = useState(false);
  const handleFavorite = () => {
    setFavorite(!favorite);

    if (favorite) {
      document.querySelector(".favorite-icon").style.color = "#e5e5e5";
    } else {
      document.querySelector(".favorite-icon").style.color = "red";
    }

    //Save the favorite pokemon in the local storage
    //But first check if the pokemon is already in the local storage
    const favoritePokemon =
      JSON.parse(localStorage.getItem("favoritePokemon")) || [];
    const isFavorite = favoritePokemon.find((pokemon) => pokemon.name === name);

    if (isFavorite) {
      const newFavoritePokemon = favoritePokemon.filter(
        (pokemon) => pokemon.name !== name
      );
      localStorage.setItem(
        "favoritePokemon",
        JSON.stringify(newFavoritePokemon)
      );
    } else {
      const newFavoritePokemon = [...favoritePokemon, pokemon];
      localStorage.setItem(
        "favoritePokemon",
        JSON.stringify(newFavoritePokemon)
      );
    }
  };

  //Use the useEffect to check if the pokemon is already in the local storage
  //If the pokemon is already in the local storage change the color of the icon
  useEffect(() => {
    const favoritePokemon =
      JSON.parse(localStorage.getItem("favoritePokemon")) || [];
    const isFavorite = favoritePokemon.find((pokemon) => pokemon.name === name);

    if (isFavorite) {
      setFavorite(true);
      const favoriteIcon = document.querySelector(".favorite-icon");

      //Check if the favorite icon is loaded
      if (favoriteIcon) {
        favoriteIcon.style.color = "red";
      }
    }
  }, [name, pokemon]);

  //Go back the previous page
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex justify-start items-center">
        <Tooltip title="Go back" arrow>
          <IconButton aria-label="settings" onClick={goBack}>
            <ArrowBackIcon className="text-[#c71d1f]" fontSize="large" />
          </IconButton>
        </Tooltip>
      </div>
      {pokemon.length === 0 ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center drop-shadow-lg">
          <Card
            sx={{
              maxWidth: 345,
              backgroundColor: "#191d21",
            }}
          >
            <CardHeader
              className="text-[#b5b5b5] font-bold"
              action={
                <Tooltip
                  title={
                    favorite ? "Remove from favorites" : "Add to favorites"
                  }
                  arrow
                >
                  <IconButton aria-label="settings" onClick={handleFavorite}>
                    <FavoriteIcon className="favorite-icon text-[#e5e5e5]" />
                  </IconButton>
                </Tooltip>
              }
              //Make the first letter of the name uppercase
              title={
                pokemon.name &&
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
              }
              sx={{
                backgroundColor: "#25292c",
              }}
            />
            <div className="flex justify-center items-center">
              <CardMedia
                component="img"
                image={
                  pokemon.species &&
                  pokemon.species.url &&
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
                }
                alt={pokemon.name}
                sx={{
                  height: 250,
                  width: 250,

                  //Make the image responsive
                  "@media (min-width: 1100px) and (max-width: 1280px)": {
                    height: 190,
                    width: 190,
                  },
                }}
              />
            </div>
            <CardContent className="text-black bg-[#25292c]">
              <p className="text-[#b5b5b5] leading-7">
                <strong>Height:</strong> {pokemon.height}
              </p>
              <p className="text-[#b5b5b5] leading-7">
                <strong>Weight:</strong> {pokemon.weight}
              </p>
              <p className="text-[#b5b5b5] leading-7">
                <strong>Abilities:</strong>{" "}
                {pokemon.abilities &&
                  pokemon.abilities.map((ability, index) => {
                    return <span key={index}>{ability.ability.name} </span>;
                  })}
              </p>
              <p className="text-[#b5b5b5] leading-7">
                <strong>Types:</strong>{" "}
                {pokemon.types &&
                  pokemon.types.map((type, index) => {
                    return <span key={index}>{type.type.name} </span>;
                  })}
              </p>
              <p className="text-[#b5b5b5] leading-7">
                <strong>Species:</strong>{" "}
                {pokemon.species && pokemon.species.name}
              </p>
              <table className="table-auto text-[#b5b5b5] mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Stat</th>
                    <th className="px-4 py-2">Base Stat</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemon.stats &&
                    pokemon.stats.map((stat, index) => {
                      return (
                        <tr key={index}>
                          <td className="border px-4 py-2">{stat.stat.name}</td>
                          <td className="border px-4 py-2">{stat.base_stat}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
