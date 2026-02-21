import { create } from "zustand";

type CompanyState = {
  companyId: number;
  setCompanyId: (id: number) => void;
};

export const useCompanyStore = create<CompanyState>(
  (set) => ({
    companyId: 1,
    setCompanyId: (id) =>
      set({ companyId: id }),
  })
);
    