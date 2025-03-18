import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import s from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Please fill in a search query!");
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <header>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={s.searchInput}
        />
        <button className={s.searchBtn} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
