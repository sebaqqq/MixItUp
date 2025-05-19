import React from "react";
import { useQuery } from "react-query";
import { RefreshCw } from "lucide-react";
import CocktailDetails from "../components/cocktails/CocktailDetails";
import { getRandomCocktail } from "../api/cocktailService";
import { Cocktail } from "../types/cocktail";

const RandomCocktailPage: React.FC = () => {
  const {
    data: cocktail,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery<Cocktail | null, Error>(["randomCocktail"], getRandomCocktail, {
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const handleGetAnotherRandom = () => {
    refetch();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark-900">Random Cocktail</h1>
        <button
          onClick={handleGetAnotherRandom}
          disabled={isLoading || isFetching}
          className="btn btn-primary"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`}
          />
          Get Another
        </button>
      </div>

      <CocktailDetails
        cocktail={cocktail as Cocktail}
        isLoading={isLoading || isFetching}
        error={error as Error}
      />
    </div>
  );
};

export default RandomCocktailPage;
