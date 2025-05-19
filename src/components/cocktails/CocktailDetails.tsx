import React from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Badge from "../ui/Badge";
import Spinner from "../ui/Spinner";
import { Cocktail } from "../../types/cocktail";
import {
  extractIngredientsAndMeasures,
  formatTags,
  getAlcoholicColor,
} from "../../utils/cocktailUtils";
import { Link } from "react-router-dom";
import { getIngredientImageUrl } from "../../api/cocktailService";

interface CocktailDetailsProps {
  cocktail: Cocktail;
  isLoading: boolean;
  error: Error | null;
}

const CocktailDetails: React.FC<CocktailDetailsProps> = ({
  cocktail,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-2">
            Oops! Something went wrong.
          </p>
          <p className="text-dark-500">{error.message}</p>
          <Link to="/" className="btn btn-primary mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!cocktail) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-dark-600 mb-2">Cocktail not found</p>
          <Link to="/" className="btn btn-primary mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const ingredientsAndMeasures = extractIngredientsAndMeasures(cocktail);
  const tags = formatTags(cocktail.strTags);
  const alcoholicColor = getAlcoholicColor(cocktail.strAlcoholic);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-dark-600 hover:text-mint-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all cocktails
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="w-full aspect-square object-cover"
              />
            </div>

            <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-medium mb-2">Details</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-dark-500">Category:</span>
                  <span className="font-medium">{cocktail.strCategory}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-dark-500">Glass:</span>
                  <span className="font-medium">{cocktail.strGlass}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-dark-500">Type:</span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${alcoholicColor}`}
                  >
                    {cocktail.strAlcoholic}
                  </span>
                </div>

                {cocktail.strIBA && (
                  <div className="flex justify-between">
                    <span className="text-dark-500">IBA:</span>
                    <span className="font-medium">{cocktail.strIBA}</span>
                  </div>
                )}
              </div>

              {tags.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm text-dark-500 mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold text-dark-900 mb-6">
            {cocktail.strDrink}
          </h1>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-3">
              {ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
                <li
                  key={`${ingredient}-${index}`}
                  className="flex items-center"
                >
                  <div className="flex-shrink-0 w-12 h-12 mr-4">
                    <img
                      src={getIngredientImageUrl(ingredient, true)}
                      alt={ingredient}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{ingredient}</p>
                    <p className="text-dark-500 text-sm">{measure}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <p className="text-dark-700 leading-relaxed whitespace-pre-line">
              {cocktail.strInstructions}
            </p>

            {cocktail.strVideo && (
              <a
                href={cocktail.strVideo}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center text-mint-600 hover:text-mint-700"
              >
                Watch video tutorial
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetails;
