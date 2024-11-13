import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { CategoriesService } from "@/services/categoriesService";
import { useProductsStore } from "@/store/productsStore";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProductsAside: FC = () => {
  const navigate = useNavigate();

  const {
    categories,
    isSidebarOpen,
    filters,
    setCategories,
    setPriceRange,
    setSelectedCategory,
  } = useProductsStore();

  const findAllCategories = useQuery({
    queryKey: ["findAllCategories"],
    queryFn: CategoriesService.findAll,
  });

  useEffect(() => {
    if (findAllCategories.data) {
      setCategories(findAllCategories.data);
    }
  }, [findAllCategories.data, setCategories]);

  const handleCategory = (categoryId?: number) => {
    navigate(`?page=1`);
    setSelectedCategory(categoryId);
  };

  return (
    <aside
      className={`w-full md:w-64 bg-white p-6 ${isSidebarOpen ? "block" : "hidden md:block"}`}
    >
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={filters.priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Categories</h3>

        <ScrollArea className="h-[650px] w-full rounded-md border p-4">
          {findAllCategories.isLoading && (
            <div className="flex flex-col gap-2">
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
            </div>
          )}

          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={category.name}
                checked={filters.categoryId === category.id}
                onCheckedChange={() => {
                  handleCategory(category.id);
                }}
              />
              <label
                htmlFor={category.name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          ))}
        </ScrollArea>
      </div>
    </aside>
  );
};
