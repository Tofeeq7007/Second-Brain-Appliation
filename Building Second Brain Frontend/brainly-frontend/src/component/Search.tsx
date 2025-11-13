import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { SearchContent } from "../api/user.api";

export interface Suggestion {
  _id: string;
  title: string;
}

interface Props {
  setSearchValue: (type: string) => void
}

export default function SearchBox({ setSearchValue }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (query.length > 1) {
        try {
          setIsLoading(true);
          const res = await SearchContent(query);
          setSuggestions(res);
        } catch (err) {
          console.error("Failed to fetch suggestions:", err);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
  };

  function solve(x: Suggestion) {
    setQuery("");
    setSuggestions([]);
    setSearchValue(x._id);
  }

  return (
    <div className="relative w-72">
      <div className={`relative transition-all duration-200 ${isFocused ? 'ring-2 ring-purple-400' : ''}`}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search size={18} />
        </div>
        
        <input
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search notes..."
          className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-bla border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent  text-white placeholder-gray-400 transition"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {(suggestions.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
              <p className="text-sm mt-2">Searching...</p>
            </div>
          ) : (
            <ul className="max-h-72 overflow-y-auto">
              {suggestions.map((item, index) => (
                <li 
                  key={item._id} 
                  onClick={() => solve(item)}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    index !== suggestions.length - 1 ? 'border-b border-gray-100' : ''
                  } hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center gap-2`}
                >
                  <Search size={14} className="text-gray-400" />
                  <span className="text-sm font-medium truncate">{item.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}