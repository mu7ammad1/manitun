import { Skeleton } from "@/components/ui/skeleton";

export default function Skeleton_story() {
  return <Function />
}
function Function() {
  return (
    <div className="flex justify-center mt-10 px-10">
      <div className="w-full max-w-4xl">
        <Skeleton className="w-full h-16 bg-stone-200 dark:bg-slate-700 mb-3" />
        <Skeleton className="w-full h-10 bg-stone-200 dark:bg-slate-700 mb-3" />
        <Skeleton className="w-full h-96 bg-stone-200 dark:bg-slate-700 mb-3" />
        <Skeleton className="w-full h-96 bg-stone-200 dark:bg-slate-700 mb-3" />
      </div>
    </div>
  );
}
