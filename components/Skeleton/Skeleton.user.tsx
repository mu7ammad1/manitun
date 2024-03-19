import { Skeleton } from "@/components/ui/skeleton";

export default function Skeleton_user() {
  return (
    <div className="flex justify-center items-center">
      <div className="h-full w-full py-5">
        <Function />
      </div>
    </div>
  );
}
function Function() {
  return (
    <div className="w-full flex justify-center gap-5 px-10 py-5 max-lg:block">
      <Skeleton className="w-1/3 h-96 bg-stone-200 dark:bg-stone-700 max-lg:w-full max-lg:h-64 max-lg:mb-5 " />
      <div className="grid gap-2 w-full">
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />
      <Skeleton className="w-full h-32 bg-stone-200 dark:bg-stone-700" />

      </div>
    </div>
  );
}
