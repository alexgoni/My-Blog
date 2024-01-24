import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import styles from "styles/navbar.module.scss";

export default function Dropdown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={`${styles.dropdown__btn} ${
          isDropdownOpen && styles.dropdown__btn__open
        }`}
        onClick={toggleDropdown}
      >
        <IoMenu size={26} />
      </div>
      {isDropdownOpen && (
        <ul className={styles.dropdown__content}>
          <li>Search</li>
          <li>Light</li>
          <li>Category</li>
          <li>새 글 작성</li>
        </ul>
      )}
    </div>
  );
}
