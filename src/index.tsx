import ReactDOM from "react-dom/client";
import "styles/index.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ScrollToTop from "modules/utils/ScrollToTop";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </RecoilRoot>
);
