import { PostInterface } from "models/post";
import { atom } from "recoil";

export const savedPostsAtom = atom<PostInterface[]>({
  key: "savedPostsAtom",
  default: [],
});
