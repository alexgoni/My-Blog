import { Timestamp } from "firebase/firestore";

export interface CategoryInterface {
  id: string;
  category: string;
  createdAt: Timestamp;
  postNum: number;
  imgUrl: string;
}
