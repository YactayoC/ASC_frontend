import { atom } from "jotai";

interface UserAtomI {
  names: string;
  email: string;
}

export const userAtom = atom<UserAtomI>({
  names: "",
  email: "",
});
