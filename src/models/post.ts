import { Timestamp } from "firebase/firestore";
import { CommentInterface } from "./comment";

export interface PostInterface {
  id?: string;
  title: string;
  summary: string;
  content: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  category: string;
  comments?: CommentInterface[];
  keyWords: string[];
  views: number;
  pinned?: boolean;
}
