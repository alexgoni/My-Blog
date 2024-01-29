import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import styles from "styles/layout.module.scss";

interface DropdownProps {
  isAuthenticated: boolean;
  isUserAdmin: boolean;
  logoutHandler: () => Promise<void>;
}

export default function Dropdown({
  isAuthenticated,
  isUserAdmin,
  logoutHandler,
}: DropdownProps) {
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
        <ul className={styles.dropdown__contents}>
          <li>Search</li>
          <li>Light</li>
          <li>
            <Link to="/category-list">Category</Link>
          </li>
          <li>
            {isAuthenticated ? (
              <span className={styles.logout} onClick={logoutHandler}>
                Logout
              </span>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          <li>
            {isUserAdmin && (
              <Link to="/write" className={styles.write}>
                새 글 작성
              </Link>
            )}
          </li>
        </ul>
      )}
    </div>
  );
}
