import { FC } from "react";
import { Skeleton } from "./skeleton";

export const CardSkeleton: FC = () => (
  <div className="flex flex-col space-y-3 w-full h-[300px]">
    <Skeleton className="w-full h-full rounded-xl bg-white" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px] bg-white" />
      <Skeleton className="h-4 w-[200px] bg-white" />
    </div>
  </div>
);
