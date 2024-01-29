import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userAuthState } from "recoil/user";
import styles from "styles/layout.module.scss";

export default function Dropdown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const isAuthenticated = useRecoilValue(userAuthState);

  const logoutHandler = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success("로그아웃 되었습니다.");
  };

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
            <Link to="/write" className={styles.write}>
              새 글 작성
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
