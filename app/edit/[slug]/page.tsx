import React, { Suspense } from "react";
import Edits from "./edits";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تعديل المقال",
  description: "",
};

export default function Edit({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Suspense fallback={`Edits....`}>
        <Edits params={params.slug} />
      </Suspense>
    </div>
  );
}
