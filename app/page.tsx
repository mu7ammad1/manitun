import Explore from "@/components/Explore/Explore";
import Suggestions from "@/components/Suggestions/Suggestions";

export default function Home() {
  return (
    <main className="flex flex-row p-3 gap-5 max-lg:block">
      <section className="basis-3/4">
        <Explore />
      </section>
      <section className="basis-1/4 max-lg:hidden">
        <Suggestions />
      </section>
    </main>
  );
}
