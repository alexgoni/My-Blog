import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "styles/user.module.scss";

export default function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChange = () => {};

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.form__title}>회원가입</h1>
        <div className={styles.form__block}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.form__block}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.form__block}>
          <label htmlFor="password-confirm">비밀번호 확인</label>
          <input
            type="password"
            name="password-confirm"
            id="password-confirm"
            value={passwordConfirm}
            onChange={onChange}
            required
          />
        </div>
        {error && error?.length > 0 && (
          <div className={styles.form__block}>
            <div className={styles.form__error}>{error}</div>
          </div>
        )}
        <div className={`${styles.form__block} ${styles.form__linkBlock}`}>
          <span>계정이 이미 있으신가요?</span>
          <Link to="/login" className={styles.form__link}>
            로그인하기
          </Link>
        </div>
        <div className={styles.form__block}>
          <input
            type="submit"
            value="회원가입"
            className={styles.form__submitBtn}
            disabled={error?.length > 0}
          />
        </div>
      </form>
    </div>
  );
}
