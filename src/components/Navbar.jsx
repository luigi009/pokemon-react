import React from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";

export default function Navbar() {
  const favoritePokemon =
    JSON.parse(localStorage.getItem("favoritePokemon")) || [];
  const totalFavorite = favoritePokemon.length;
  return (
    <>
      <div className="flex justify-between items-center px-6 sm:px-6 py-1 bg-[#191d21]">
        <div className="flex justify-start items-center">
          <Link to="/">
            <img
              src="/pokeapi_image.png"
              alt="pokeapi_image"
              className="w-34 h-12"
            />
          </Link>
        </div>
        <div className="flex justify-end items-center">
          <Link to="/favorite">
            <Tooltip title="My Favorites Pokemons">
              <IconButton>
                <Badge badgeContent={totalFavorite} color="error">
                  <FavoriteIcon className="text-white" fontSize="large" />
                </Badge>
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </div>
    </>
  );
}
