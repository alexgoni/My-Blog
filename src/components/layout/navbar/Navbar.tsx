import { Link } from "react-router-dom";
import styles from "styles/layout.module.scss";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Dropdown from "./Dropdown";
import { useRecoilState, useRecoilValue } from "recoil";
import { isUserAdminState, currentUserObj } from "recoil/user";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import { themeState } from "recoil/theme";

interface NavbarProps {
  isMobileWidth: boolean;
}

export default function Navbar({ isMobileWidth }: NavbarProps) {
  const user = useRecoilValue(currentUserObj);
  const isUserAdmin = useRecoilValue(isUserAdminState);
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  const logoutHandler = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success("로그아웃 되었습니다.");
  };

  return (
    <nav className={styles.nav}>
      <h1 className={styles.nav__title}>
        <Link to="/">Problem Solver</Link>
      </h1>
      {isMobileWidth ? (
        <Dropdown
          isAuthenticated={!!user}
          isUserAdmin={isUserAdmin}
          logoutHandler={logoutHandler}
        />
      ) : (
        <div className={styles.nav__tabList}>
          {isUserAdmin && (
            <Link to="/write" className={styles.write}>
              새 글 작성
            </Link>
          )}
          {!!user ? (
            <span className={styles.logout} onClick={logoutHandler}>
              Logout
            </span>
          ) : (
            <Link to="/login" className={styles.login}>
              Login
            </Link>
          )}
          <Link to="/category-list" className={styles.category}>
            Category
          </Link>
          <div className={styles.lightMode} onClick={toggleTheme}>
            {theme === "light" ? (
              <BsSunFill size={20} />
            ) : (
              <BsMoonFill size={20} />
            )}
          </div>
          <div className={styles.search}>
            <CiSearch size={20} />
          </div>
        </div>
      )}
    </nav>
  );
}
