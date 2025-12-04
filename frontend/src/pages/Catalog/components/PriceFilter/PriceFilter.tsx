import styles from "./PriceFilter.module.css";
import { useState } from "react";

type PriceFilterProps = {
  setMaxPrice: (value: number | string) => void;
  setMinPrice: (value: number | string) => void;
  currentMinPrice?: number | string;
  currentMaxPrice?: number | string;
};

export default function PriceFilter({setMaxPrice, setMinPrice, currentMinPrice = "", currentMaxPrice = ""}: PriceFilterProps) {
  const [min, setMin] = useState<number | string>(currentMinPrice);
  const [max, setMax] = useState<number | string>(currentMaxPrice);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMinPrice(min);
    setMaxPrice(max);
  };
  return (
    <form className={styles.priceFilterForm} onSubmit={handleSubmit}>
      <label htmlFor="minPrice">Минимальная цена</label>
      <input
        type="number"
        id="minPrice"
        className={styles.priceInput}
        value={min}
        onChange={e => setMin(e.target.value)}
      />
      <label htmlFor="maxPrice">Максимальная цена</label>
      <input
        type="number"
        id="maxPrice"
        className={styles.priceInput}
        value={max}
        onChange={e => setMax(e.target.value)}
      />
      <button className={styles.applyButton} type="submit">
        Применить
      </button>
    </form>
  );
}