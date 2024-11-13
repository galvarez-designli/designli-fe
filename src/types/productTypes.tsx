export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: Array<string>;
  creationAt: string;
  updatedAt: string;
  category: Category;
};

export type Category = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};
