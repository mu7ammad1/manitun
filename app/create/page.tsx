import { Toaster } from "@/components/ui/toaster";

import EditorUi from "./Editor";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Create() {
  return (
    <div className="w-full flex justify-center items-center">
      <EditorUi />
      <Toaster />
    </div>
  );
}
