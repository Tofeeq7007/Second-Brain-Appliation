import React, { useEffect, useState } from "react";
import { SearchContent } from "../api/user.api";

export interface Suggestion {
  _id: string;
  title: string;
}
interface Props{
  setSearchValue:(type:string)=>void
}
export default  function SearchBox({setSearchValue}:Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  useEffect(()=>{
      const timerId = setTimeout(async()=>{
        if (query.length > 1) {
          try {
            const res = await SearchContent(query);
            setSuggestions(res);
          } catch (err) {
            console.error("Failed to fetch suggestions:", err);
            setSuggestions([]); // Clear suggestions on error
          }
        } else {
          setSuggestions([]); // Clear suggestions if query is too short
        }
      },1000)

    return  ()=>{
      clearTimeout(timerId)
    }
  },[query])


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  function solve(x:Suggestion){
    setQuery("")
    setSuggestions([]);
    setSearchValue(x._id)
  }
  return (

    <div className="relative">
      <input
        value={query}
        onChange={(e) => handleChange(e)}
        placeholder="Search..."
        className="border px-3 py-2 rounded w-64"
      />

      {suggestions.length > 0 && (
        <ul className="absolute bg-white  border mt-1 rounded shadow w-64 z-10">
          {suggestions.map((item) => (
            // Use item._id for the key prop and item.title for the display text
            <li key={item._id} onClick={()=>solve(item)} className="p-2 hover:bg-gray-100 border-b-2 border-gray-500 cursor-pointer">
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}