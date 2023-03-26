import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningIcon from "@mui/icons-material/Warning";

export default function Favorite() {
  //Go back the previous page
  const goBack = () => {
    window.history.back();
  };

  //Go to the favoritePokemon on the local storage and remove the pokemon when click on the icon
  //Use the name of the pokemon to find the pokemon in the local storage to remove it
  const handleRemoveFavorite = (pokemonName) => {
    const favoritePokemon =
      JSON.parse(localStorage.getItem("favoritePokemon")) || [];
    const newFavoritePokemon = favoritePokemon.filter(
      (pokemon) => pokemon.name !== pokemonName
    );
    localStorage.setItem("favoritePokemon", JSON.stringify(newFavoritePokemon));
    window.location.reload();
  };

  //Set in the variable favoritePokemon the favoritePokemon on the local storage
  const favoritePokemon =
    JSON.parse(localStorage.getItem("favoritePokemon")) || [];

  return (
    <>
      <div className="flex justify-start items-center">
        <Tooltip title="Go back">
          <IconButton onClick={goBack}>
            <ArrowBackIcon className="text-[#c71d1f]" fontSize="large" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favoritePokemon &&
            favoritePokemon.map((pokemon) => (
              <div className="drop-shadow-lg" key={pokemon.id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    margin: "0 auto",
                    backgroundColor: "#191d21",
                  }}
                >
                  <CardHeader
                    //Make the first letter of the pokemon name uppercase
                    title={
                      pokemon.name &&
                      pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)
                    }
                    className="text-[#b5b5b5] font-bold"
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
                          height: 200,
                          width: 200,
                        },
                      }}
                    />
                  </div>
                  <CardContent className="text-black bg-[#25292c]">
                    <div className="flex justify-center items-center">
                      <Tooltip title="Remove from favorites">
                        <IconButton
                          onClick={() => {
                            handleRemoveFavorite(pokemon.name);
                          }}
                        >
                          <DeleteIcon
                            fontSize="large"
                            className="favorite-icon text-[#b5b5b5]"
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
        {favoritePokemon.length === 0 && (
          <div className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
            <div className="flex flex-col sm:flex-row justify-center items-start">
              <div className="mx-auto p-6 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <WarningIcon className="text-red-600" fontSize="large" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-base font-semibold leading-5 sm:leading-6 text-gray-900">
                  You don't have any favorite pokemon
                </h3>
                <div className="mt-6 sm:mt-2">
                  <p className="text-sm text-gray-500">
                    Please go to the home page select your pokemon <br />
                    and click on the icon to add it to your favorites
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
