import { Firestore } from "firebase/firestore";
import { NamedQuery } from "./index";
export declare function namedQuery<T>(firestore: Firestore, name: string): NamedQuery<T>;
