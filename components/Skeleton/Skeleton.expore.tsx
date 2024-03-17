import { Skeleton } from "@/components/ui/skeleton";

export default function Skeleton_expore() {
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
    <div className="w-full h-24 flex gap-3 mb-2 p-5 px-10">
      <div className="basis-full">
        <Skeleton className="w-full h-24 bg-stone-200 dark:bg-slate-700" />
      </div>
      <div className="basis-52">
        <Skeleton className="w-full h-24 bg-stone-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}
