import { UserType } from "@/types/user";
import { StateCreator } from "zustand";

export interface AuthSlice {
  userInfo: undefined | UserType;
  setUserInfo: (userInfo: UserType) => void;
  logOut: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo: UserType) => set({ userInfo }), // 这边的 userInfo 就是这个 obj 中 的userInfo
  logOut: () => {
    set({ userInfo: undefined });
  },
});
