import { create } from "zustand";
import {
  AuthSlice,
  createAuthSlice,
} from "./slice";

type StoreState = AuthSlice ;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  // ...createScrapingSlice(...a),
}));

