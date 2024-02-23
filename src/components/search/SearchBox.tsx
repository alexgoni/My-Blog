import React, { useState } from "react";
import styles from "styles/search.module.scss";
import { CiSearch } from "react-icons/ci";

export default function SearchBox() {
  const [searchWord, setSearchWord] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchWord(value);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        name="search-box"
        id="search-box"
        value={searchWord}
        onChange={onChange}
        className={styles.searchBox}
        placeholder="검색어를 입력하세요."
      />
      <CiSearch className={styles.icon} size={20} />
    </div>
  );
}
