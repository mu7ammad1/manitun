import Articales from "./Articales";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "صفحة الاستكشاف",
  description: "استكشف شغفك",
};

export default function ExplorePage() {
  return (
    <div className="flex flex-col gap-3">
      <Articales />
    </div>
  );
}
