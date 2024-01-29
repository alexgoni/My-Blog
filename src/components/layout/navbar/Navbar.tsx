import { Link } from "react-router-dom";
import styles from "styles/navbar.module.scss";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Dropdown from "./Dropdown";
import { useRecoilValue } from "recoil";
import { userAuthState } from "recoil/user";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

interface NavbarProps {
  isMobileWidth: boolean;
}

export default function Navbar({ isMobileWidth }: NavbarProps) {
  const isAuthenticated = useRecoilValue(userAuthState);

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
        <Dropdown />
      ) : (
        <div className={styles.nav__tabList}>
          <Link to="/write" className={styles.write}>
            새 글 작성
          </Link>
          {isAuthenticated ? (
            <span className={styles.logout} onClick={logoutHandler}>
              로그아웃
            </span>
          ) : (
            <Link to="/login" className={styles.login}>
              로그인
            </Link>
          )}
          <Link to="/category-list" className={styles.category}>
            Category
          </Link>
          <div className={styles.lightMode}>
            <BsSunFill size={20} />
          </div>
          <div className={styles.search}>
            <CiSearch size={20} />
          </div>
        </div>
      )}
    </nav>
  );
}
