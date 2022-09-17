import { atom } from "recoil";

export const cartAtom = atom<any[]>({
  default: [],
  key: "cartAtom",
});
