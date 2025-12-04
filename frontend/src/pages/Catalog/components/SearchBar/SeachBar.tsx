import styles from "./SearchBar.module.css";
import searchIcon from "../../../../images/icons/search.svg";
import { useMemo, useEffect, useState } from "react";
import debounce from "lodash/debounce";

type SearchBarProps = {
  onSearch: (value: string) => void;
  search?: string;
};

export default function SearchBar({onSearch, search = ""}: SearchBarProps) {
    const [searchValue, setSearchValue] = useState<string>(search);
    
    const debouncedSearch = useMemo(
      () => debounce((val: string) => {
        onSearch(val);
      }, 600),
      [onSearch]
    );

    
    useEffect(() => {
      setSearchValue(search);
    }, [search]);

    useEffect(() => {
      debouncedSearch(searchValue);
      return () => debouncedSearch.cancel();
    }, [searchValue, debouncedSearch]);

    return <div className={styles.searchBarContainer}>
        <input 
          type="text" 
          placeholder="Поиск по наименованию товара" 
          className={styles.searchBar} 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <img src={searchIcon} alt="search" className={styles.searchIcon} />
    </div>;
}

