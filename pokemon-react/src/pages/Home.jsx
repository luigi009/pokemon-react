import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';

const Home = () => {

  //States to control the list of pokemons and the character of each pokemon
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonCharacter, setPokemonCharacter] = useState([]);

  //State to control the page number
  const [page, setPage] = useState(1);
  
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  //Function to get the list of pokemons
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  const getPokemonList = async () => {
      const { data } = await axios.get(baseUrl);
      setPokemonList(data.results);
      return data;
  }

  //Function to get the character of each pokemon
  useEffect(() => {
      getPokemonList();
  }, []);

  useEffect(() => {
      pokemonList.length && pokemonList.map((pokemon, index) => {
          const paddedId = ('00' + (index + 1)).slice(-3);
          const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
          setPokemonCharacter((prev) => [...prev, { ...pokemon, image }]);
      })
  }, [pokemonList]);

  return (
      <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {
                //Limit the number of pokemons to show in the page
                pokemonCharacter.length && pokemonCharacter.slice((page - 1) * 10, page * 10).map((pokemon, index) => {
                    return (
                        <Card key={index} sx={345}>
                            <div className='flex justify-center items-center'>
                                <CardMedia
                                    component="img"
                                    image={pokemon.image}
                                    alt={pokemon.name}
                                    sx={{
                                        height: 250,
                                        width: 250,

                                        //Make the image responsive
                                        '@media (min-width: 1100px) and (max-width: 1280px)': {
                                            height: 150,
                                            width: 150,
                                        },
                                    }}
                                    />
                            </div>
                            <CardContent sx={{
                                backgroundColor: '#f5f5f5',
                            }}>
                                <p className='text-3xl font-semibold sm:text-xl xl:text-xl 2xl:text-4xl'>
                                    {
                                        //Make the first letter of the pokemon name uppercase
                                        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                                    }
                                </p>
                            </CardContent>
                            <CardActions>
                                <Link to={`/pokemon/${pokemon.name}`}>
                                    <Button size="medium" variant="outlined">Learn More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    )
                })
                }
          </div>
          <div className='mt-8 flex justify-center items-center w-full'>
            <Pagination count={16} page={page} onChange={handleChangePage} color="primary" />
          </div>
      </>
  )
}

export default Home;