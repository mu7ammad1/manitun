import Explore from "./explore/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحة للرئيسية",
  description: "استكشف شغفك",
};

export default function Home() {
  return <Explore />
}
