import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Article {
  id: string;
  title: string;
  description: string;
  tags: string[];
  draft: boolean;
  createdAt: string;
  authorId: string;
  image?: string;
  author: {
    id: string;
    image: string;
  };
}

interface data {
  tag: string;
}
export default function ViewCarousel() {
  return (
    <Carousel className="">
      <CarouselContent>
        <CarouselItem></CarouselItem>
        <CarouselItem>2222222222222222222</CarouselItem>
        <CarouselItem>3333333333333333333</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

// <CarouselItem key={index} className="basis-auto -ml-0 pl-0 ">
//   <Link href={`/tag/${tag === "" ? "explore" : tag}`}>
//     <Button
//       variant={"outline"}
//       className="border-0 gap-2 bg-stone-200 hover:bg-stone-200 px-5 text-lg rounded-full"
//     >
//       {tag === "palestine"
//         ? `🍉 ${tag}`
//         : tag === "ramadam"
//         ? `🌙 ${tag}`
//         : tag === ""
//         ? "🦉 Explore"
//         : tag}
//     </Button>
//   </Link>
// </CarouselItem>
