import { Skeleton } from "@/components/ui/skeleton";

export default function Skeleton_story() {
  return (
    <div className="flex justify-center items-center">
      <div className="h-full w-full py-5">
        <Function />
        <Function />
        <Function />
        <Function />
        <Function />
        <Function />
        <Function />
        <Function />
        <Function />
        <Function />
        <Function />
        <Function />
        <Function />
      </div>
    </div>
  );
}
function Function() {
  return (
    <div className="w-full flex">
      <Skeleton className="w-full h-10 bg-stone-200 dark:bg-slate-700" />
      <div className="flex">
        <Skeleton className="w-4/5 h-10 bg-stone-200 dark:bg-slate-700" />
        <Skeleton className="w-1/5 h-10 bg-stone-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}
