import React, { useState } from "react";
import { useQuery } from "react-query";
import SearchBar from "../components/search/SearchBar";
import CocktailList from "../components/cocktails/CocktailList";
import FilterPanel from "../components/filters/FilterPanel";
import { Cocktail, FilterType } from "../types/cocktail";
import { searchCocktailsByName, filterCocktails } from "../api/cocktailService";
import { Martini } from "lucide-react";

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<{
    type: FilterType;
    value: string;
  } | null>(null);

  const {
    data: cocktails = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery<Cocktail[], Error>(
    ["cocktails", searchTerm, activeFilter],
    async () => {
      if (activeFilter) {
        return filterCocktails(activeFilter.type, activeFilter.value);
      }
      if (searchTerm) {
        return searchCocktailsByName(searchTerm);
      }
      return searchCocktailsByName("margarita");
    },
    {
      staleTime: 300000,
      retry: 1,
    }
  );

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setActiveFilter(null);
  };

  const handleApplyFilter = (type: FilterType, value: string) => {
    setActiveFilter({ type, value });
    setSearchTerm("");
  };

  const handleClearFilter = () => {
    setActiveFilter(null);
    refetch();
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <div className="inline-flex items-center mb-4">
          <Martini className="w-8 h-8 text-mint-500 mr-2" />
          <h1 className="text-4xl font-bold text-dark-900">MixItUp</h1>
        </div>
        <p className="text-dark-600 max-w-2xl mx-auto">
          Discover delicious cocktail recipes from around the world. Search by
          name or use filters to find the perfect drink for any occasion.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <FilterPanel
        onApplyFilter={handleApplyFilter}
        activeFilter={activeFilter}
        onClearFilter={handleClearFilter}
      />

      <CocktailList
        cocktails={cocktails}
        isLoading={isLoading || isFetching}
        error={error as Error}
      />
    </div>
  );
};

export default HomePage;
