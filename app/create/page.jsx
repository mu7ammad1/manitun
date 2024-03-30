import dynamic from "next/dynamic";
import { Suspense } from "react";

const EditorUi = dynamic(() => import("./Editor"), { ssr: false });

export default function Create() {
  return (
    <div className="w-full flex justify-center items-center">
      <Suspense fallback={`component EditorUi is Loading....`}>
        <EditorUi />
      </Suspense>
    </div>
  );
}
