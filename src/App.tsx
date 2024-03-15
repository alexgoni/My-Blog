import Router from "components/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "components/layout/Loading";
import { useRecoilValue } from "recoil";
import { RecoilEnv } from "recoil";
import { themeState } from "recoil/theme";
import useCheckingAuth from "modules/hooks/useCheckingAuth";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

function App() {
  const initialAuthPass = useCheckingAuth();
  const theme = useRecoilValue(themeState);

  return (
    <div className={theme === "light" ? "white" : "dark"}>
      <ToastContainer autoClose={500} hideProgressBar newestOnTop />
      {initialAuthPass ? <Router /> : <Loading />}
    </div>
  );
}

export default App;
