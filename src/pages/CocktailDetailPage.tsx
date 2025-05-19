import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import CocktailDetails from "../components/cocktails/CocktailDetails";
import { getCocktailById } from "../api/cocktailService";
import { Cocktail } from "../types/cocktail";

const CocktailDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: cocktail,
    isLoading,
    error,
  } = useQuery<Cocktail | null, Error>(
    ["cocktail", id],
    () => getCocktailById(id!),
    {
      enabled: !!id,
      staleTime: 300000,
      retry: 1,
    }
  );

  return (
    <div>
      <CocktailDetails
        cocktail={cocktail as Cocktail}
        isLoading={isLoading}
        error={error as Error}
      />
    </div>
  );
};

export default CocktailDetailPage;
