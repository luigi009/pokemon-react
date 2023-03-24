import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const { name } = useParams();

  //Function to get the character of each pokemon
  const getPokemon = async () => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    setPokemon(data);
    return data;
  }

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <img className='w-40 h-40' src={pokemon.sprites?.front_default} alt={pokemon.name} />
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <h1 className="text-2xl font-bold">{pokemon.name}</h1>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold">Abilities</h2>
            <div className="flex flex-col justify-center items-center">
              {
                pokemon.abilities?.map((ability, index) => {
                  return (
                    <p key={index}>{ability.ability.name}</p>
                  )
                })
              }
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold">Types</h2>
            <div className="flex flex-col justify-center items-center">
              {
                pokemon.types?.map((type, index) => {
                  return (
                    <p key={index}>{type.type.name}</p>
                  )
                })
              }
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold">Stats</h2>
            <div className="flex flex-col justify-center items-center">
              {
                pokemon.stats?.map((stat, index) => {
                  return (
                    <p key={index}>{stat.stat.name}: {stat.base_stat}</p>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
