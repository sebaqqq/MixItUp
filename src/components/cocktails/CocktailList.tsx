import React from "react";
import { Cocktail } from "../../types/cocktail";
import CocktailCard from "./CocktailCard";
import Spinner from "../ui/Spinner";

interface CocktailListProps {
  cocktails: Cocktail[];
  isLoading: boolean;
  error: Error | null;
}

const CocktailList: React.FC<CocktailListProps> = ({
  cocktails,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-2">
            Oops! Something went wrong.
          </p>
          <p className="text-dark-500">{error.message}</p>
        </div>
      </div>
    );
  }

  if (cocktails.length === 0) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <p className="text-xl text-dark-600 mb-2">No cocktails found</p>
          <p className="text-dark-500">Try a different search term or filter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cocktails.map((cocktail) => (
        <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
      ))}
    </div>
  );
};

export default CocktailList;
