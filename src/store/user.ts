import { atom } from "jotai";
import { IEmpresa, IPostulante } from "../interfaces/User";

// Función para leer del localStorage al crear el átomo
const getInitialUserCompany = (): IEmpresa => {
  const storedCompany = localStorage.getItem("userInfo");
  return storedCompany ? JSON.parse(storedCompany) : ({} as IEmpresa);
};

const getInitialUserPostulant: () => IPostulante = () => {
  const storedPostulant = localStorage.getItem("userInfo");
  return storedPostulant ? JSON.parse(storedPostulant) : ({} as IPostulante);
};

// Átomos para los usuarios de la empresa y los postulantes
export const userAtomCompany = atom(
  getInitialUserCompany(),
  (_, set, update) => {
    set(userAtomCompany, update);
    localStorage.setItem("userInfo", JSON.stringify(update));
  }
);

export const userAtomPostulant = atom(
  getInitialUserPostulant(),
  (_, set, update) => {
    set(userAtomPostulant, update);
    localStorage.setItem("userInfo", JSON.stringify(update));
  }
);
