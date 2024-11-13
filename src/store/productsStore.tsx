import { Category, Product } from "@/types/productTypes";
import { create } from "zustand";

interface ProductsStore {
  products: Array<Product>;
  categories: Array<Category>;
  filters: {
    categoryId?: number;
    priceRange: [number, number];
    name: string;
  };
  isSidebarOpen: boolean;
  pagination: { page: number; limit: number; offset: number };
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category?: number) => void;
  setPriceRange: (priceRange: [number, number]) => void;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  setName: (name: string) => void;
  setPagination: (pagination: {
    page: number;
    limit: number;
    offset: number;
  }) => void;
}

export const productsStore = create<ProductsStore>((set) => ({
  products: [],
  categories: [],
  filters: { priceRange: [0, 1000], name: "" },
  isSidebarOpen: false,
  pagination: { page: 1, limit: 9, offset: 0 },
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (categoryId) =>
    set((state) => ({
      filters: {
        categoryId,
        priceRange: state.filters.priceRange,
        name: state.filters.name,
      },
    })),
  setPriceRange: (priceRange) =>
    set((state) => ({ filters: { ...state.filters, priceRange } })),
  setName: (name) => set((state) => ({ filters: { ...state.filters, name } })),
  setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  setPagination: (pagination) => set({ pagination }),
}));

export const useProductsStore = () => {
  const products = productsStore((state) => state.products);
  const filters = productsStore((state) => state.filters);
  const categories = productsStore((state) => state.categories);
  const isSidebarOpen = productsStore((state) => state.isSidebarOpen);
  const pagination = productsStore((state) => state.pagination);

  const setProducts = productsStore((state) => state.setProducts);
  const setCategories = productsStore((state) => state.setCategories);
  const setPriceRange = productsStore((state) => state.setPriceRange);
  const setSelectedCategory = productsStore(
    (state) => state.setSelectedCategory,
  );
  const setName = productsStore((state) => state.setName);
  const setIsSidebarOpen = productsStore((state) => state.setIsSidebarOpen);
  const setPagination = productsStore((state) => state.setPagination);

  return {
    products,
    filters,
    categories,
    pagination,
    isSidebarOpen,
    setPagination,
    setProducts,
    setCategories,
    setSelectedCategory,
    setPriceRange,
    setName,
    setIsSidebarOpen,
  };
};
