import { Toaster } from "@/components/ui/toaster";

import EditorUi from "./Editor";
export default function Create() {
  return (
    <div className="w-full flex justify-center items-center">
      <EditorUi />
      <Toaster />
    </div>
  );
}
