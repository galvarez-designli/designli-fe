import { Card, CardContent } from "@/components/ui/card";
import { ProductsService } from "@/services/productsService";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";

export const ProductDetail: FC = () => {
  const params = useParams();

  const findProduct = useQuery({
    queryKey: ["findProduct", params.id],
    queryFn: () => ProductsService.findOne(Number(params.id)),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/products"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={findProduct.data?.images[0]}
            alt={findProduct.data?.title}
            width={500}
            height={500}
            className="rounded-lg object-cover w-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{findProduct.data?.title}</h1>
          <p className="text-xl text-gray-600 mb-4">
            ${findProduct.data?.price.toFixed(2)}
          </p>
          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg mb-2">Product Details</h2>
              <p className="text-gray-600">{findProduct.data?.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Specifications</h2>
        <Card>
          <CardContent className="p-4">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <dt className="font-semibold text-gray-600">Category</dt>
                <dd>{findProduct.data?.category.name}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-600">Price</dt>
                <dd>${findProduct.data?.price.toFixed(2)}</dd>
              </div>
              {/* Add more specifications as needed */}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
