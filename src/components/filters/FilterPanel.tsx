import React, { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { FilterOption, FilterType } from "../../types/cocktail";
import {
  getCategories,
  getGlassTypes,
  getAlcoholicFilters,
  getIngredients,
} from "../../api/cocktailService";
import Spinner from "../ui/Spinner";

interface FilterPanelProps {
  onApplyFilter: (type: FilterType, value: string) => void;
  activeFilter: { type: FilterType; value: string } | null;
  onClearFilter: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  onApplyFilter,
  activeFilter,
  onClearFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [glassTypes, setGlassTypes] = useState<FilterOption[]>([]);
  const [alcoholicFilters, setAlcoholicFilters] = useState<FilterOption[]>([]);
  const [ingredients, setIngredients] = useState<FilterOption[]>([]);
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>("c");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setIsLoading(true);
        const [categoryList, glassList, alcoholicList, ingredientList] =
          await Promise.all([
            getCategories(),
            getGlassTypes(),
            getAlcoholicFilters(),
            getIngredients(),
          ]);

        setCategories(
          categoryList.map((category) => ({
            value: category,
            type: "c",
            label: category,
          }))
        );

        setGlassTypes(
          glassList.map((glass) => ({
            value: glass,
            type: "g",
            label: glass,
          }))
        );

        setAlcoholicFilters(
          alcoholicList.map((type) => ({
            value: type,
            type: "a",
            label: type,
          }))
        );

        setIngredients(
          ingredientList.slice(0, 50).map((ingredient) => ({
            value: ingredient,
            type: "i",
            label: ingredient,
          }))
        );
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const toggleFilterPanel = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterTypeChange = (type: FilterType) => {
    setSelectedFilterType(type);
  };

  const handleFilterSelect = (type: FilterType, value: string) => {
    onApplyFilter(type, value);
    setIsOpen(false);
  };

  const getActiveFilterOptions = () => {
    switch (selectedFilterType) {
      case "c":
        return categories;
      case "g":
        return glassTypes;
      case "a":
        return alcoholicFilters;
      case "i":
        return ingredients;
      default:
        return [];
    }
  };

  return (
    <div className="mb-6 relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={toggleFilterPanel}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {activeFilter && (
            <button
              onClick={onClearFilter}
              className="btn btn-secondary flex items-center space-x-2 bg-red-50 text-red-600 hover:bg-red-100"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {activeFilter && (
          <div className="text-sm text-dark-600">
            Filtering by:{" "}
            <span className="font-medium">{activeFilter.value}</span>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="card p-4 shadow-lg animate-fade-in absolute z-10 bg-white w-full max-w-2xl">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">Filter cocktails</h3>
            <button
              onClick={toggleFilterPanel}
              className="text-dark-500 hover:text-dark-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                selectedFilterType === "c"
                  ? "border-mint-500 text-mint-700"
                  : "border-transparent text-dark-500 hover:text-dark-700"
              }`}
              onClick={() => handleFilterTypeChange("c")}
            >
              Categories
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                selectedFilterType === "g"
                  ? "border-mint-500 text-mint-700"
                  : "border-transparent text-dark-500 hover:text-dark-700"
              }`}
              onClick={() => handleFilterTypeChange("g")}
            >
              Glasses
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                selectedFilterType === "a"
                  ? "border-mint-500 text-mint-700"
                  : "border-transparent text-dark-500 hover:text-dark-700"
              }`}
              onClick={() => handleFilterTypeChange("a")}
            >
              Types
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                selectedFilterType === "i"
                  ? "border-mint-500 text-mint-700"
                  : "border-transparent text-dark-500 hover:text-dark-700"
              }`}
              onClick={() => handleFilterTypeChange("i")}
            >
              Ingredients
            </button>
          </div>

          {isLoading ? (
            <div className="p-4 flex justify-center">
              <Spinner size="md" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1">
              {getActiveFilterOptions().map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterSelect(option.type, option.value)}
                  className="text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
