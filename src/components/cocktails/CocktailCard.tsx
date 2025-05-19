import React from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import Badge from "../ui/Badge";
import { Cocktail } from "../../types/cocktail";

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
  const {
    idDrink,
    strDrink,
    strDrinkThumb,
    strCategory,
    strGlass,
    strAlcoholic,
  } = cocktail;

  return (
    <div className="card group overflow-hidden animate-fade-in">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={strDrinkThumb}
          alt={strDrink}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link
            to={`/cocktail/${idDrink}`}
            className="btn btn-primary w-full shadow-lg"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Link>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-dark-900 line-clamp-1">
          {strDrink}
        </h3>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge
            variant={
              strAlcoholic?.toLowerCase() === "alcoholic"
                ? "alcoholic"
                : "nonAlcoholic"
            }
          >
            {strAlcoholic}
          </Badge>

          <Badge variant="outline">{strCategory}</Badge>

          <Badge variant="outline">{strGlass}</Badge>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
