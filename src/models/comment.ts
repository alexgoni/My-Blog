import { Timestamp } from "firebase/firestore";

export interface CommentInterface {
  content: string;
  uid: string;
  email: string;
  createdAt: Timestamp;
}
