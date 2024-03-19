import { Skeleton } from "@/components/ui/skeleton";

export default function Skeleton_ana() {
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
