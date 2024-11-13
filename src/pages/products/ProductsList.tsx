import { FC, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "@/services/productsService";
import { productsStore, useProductsStore } from "@/store/productsStore";
import { Product } from "@/types/productTypes";
import { ProductsAside } from "@/pages/products/components/ProductsAside";
import { CustomPagination } from "@/components/ui/customPagination";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CardSkeleton } from "@/components/ui/cardSkeleton";

export const ProductList: FC = () => {
  const navigate = useNavigate();

  const pagination = productsStore((state) => state.pagination);
  const setPagination = productsStore((state) => state.setPagination);

  const {
    products,
    isSidebarOpen,
    setIsSidebarOpen,
    setProducts,
    filters,
    setName,
  } = useProductsStore();

  const [searchParams] = useSearchParams();

  const findAllProducts = useQuery<Array<Product>>({
    queryKey: ["findProducts", pagination, filters],
    queryFn: () =>
      ProductsService.findAll({
        limit: pagination.limit,
        offset: pagination.offset,
        ...filters,
      }),
    enabled: true,
  });

  // Set pagination from query params
  useEffect(() => {
    if (searchParams.get("page")) {
      setPagination({
        page: Number(searchParams.get("page")),
        limit: pagination.limit,
        offset: (Number(searchParams.get("page")) - 1) * pagination.limit,
      });
    }
  }, [searchParams, pagination.limit, setPagination]);

  // Set products when data is fetched
  useEffect(() => {
    if (findAllProducts.data) {
      setProducts(findAllProducts.data);
    }
  }, [findAllProducts.data, setProducts]);

  const handleSearch = (param: string) => {
    setName(param);
    navigate(`?page=1`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <ProductsAside />

      <main className="flex-1 p-6">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={filters.name}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-grow"
          />
          <Button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
          {findAllProducts.isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : products.length === 0 ? (
            <div>No products available</div>
          ) : (
            products?.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <img
                  src={
                    product.images[0] ||
                    "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
                  }
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-nowrap overflow-hidden overflow-ellipsis">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{product.category.name}</p>
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-blue-600 hover:text-blue-800 w-full"
                  >
                    <Button className="w-full">See detail</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        <div className="flex items-end justify-end w-full mt-3">
          <CustomPagination
            total={50}
            limit={pagination.limit}
            page={
              searchParams.get("page") ? Number(searchParams.get("page")) : 1
            }
            onPageChange={(pagination) => {
              navigate(`?page=${pagination.page}`);
              setPagination(pagination);
            }}
          />
        </div>
      </main>
    </div>
  );
};
