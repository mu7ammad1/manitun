import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiSearch } from "react-icons/ci";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function DialogSearch() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="text-xl rounded-full bg-secondary p-2">
          <CiSearch />
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-full">
        <DialogHeader>
          <DialogTitle>
            <Input
              placeholder="...ابحث هنا"
              className="bg-stone-200 dark:bg-stone-100 placeholder:text-right text-xl mt-3 rounded-full"
              dir="rtl"
            />
          </DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
