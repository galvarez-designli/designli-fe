import request from "@/lib/netwok";
import { Product } from "@/types/productTypes";

class ProductsService {
  public async findAll(params: {
    limit?: number;
    offset?: number;
    categoryId?: number;
    priceRange: [number, number];
    name: string;
  }): Promise<Array<Product>> {
    const { limit = 9, offset = 0 } = params;

    return request({
      method: "GET",
      url: `/products`,
      params: {
        offset,
        limit,
        title: params.name,
        price_min: params.priceRange[0],
        price_max: params.priceRange[1],
        categoryId: params.categoryId,
      },
    });
  }

  public async findOne(id: number): Promise<Product> {
    return request({
      method: "GET",
      url: `/products/${id}`,
    });
  }
}

const productsService = new ProductsService();

export { productsService as ProductsService };
