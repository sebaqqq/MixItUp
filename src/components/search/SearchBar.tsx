import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search for cocktails...",
  initialValue = "",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-dark-400" />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pl-10 pr-12 py-3 text-lg w-full rounded-xl"
          placeholder={placeholder}
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-12 flex items-center pr-2"
          >
            <X className="h-5 w-5 text-dark-400 hover:text-dark-600" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary py-1.5"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
