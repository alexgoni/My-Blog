import { atom } from "recoil";

export const themeState = atom<string>({
  key: "themeState",
  default: window.localStorage.getItem("theme") || "light",
});
