import { Suspense } from "react";
import dynamic from "next/dynamic";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحة الاستكشاف",
  description: "استكشف شغفك",
};

const Articales = dynamic(() => import("./Articales"), { ssr: false });

export default function ExplorePage() {
  return (
    <article className="flex flex-col gap-3">
      <Suspense fallback={`Articales Loading...`}>
        <Articales />
      </Suspense>
    </article>
  );
}
