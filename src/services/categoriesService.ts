import request from "@/lib/netwok";
import { Category } from "@/types/productTypes";

class CategoriesService {
  public findAll(): Promise<Array<Category>> {
    return request({ method: "GET", url: "/categories" });
  }
}

const categoriesService = new CategoriesService();
export { categoriesService as CategoriesService };
