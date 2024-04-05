import { WEBSITEAPI } from "@/app/V";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";

export default function ViewCarousel() {
  const [tags, setTags] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const user = useCurrentUser();

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${WEBSITEAPI}TagFollow/${user?.username}`
        );
        // استخراج العلامات فقط من البيانات المستقبلة
        const tagsData = response.data.tagFollow.map((item: any) => item.tag);
        setTags(tagsData);
      } catch (error) {
        setError("Failed to fetch tags data.");
        console.error("Failed to fetch tags data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.username) {
      fetchTags();
    }
  }, [user?.username]);

  return (
    <Carousel>
      <CarouselContent className="space-x-2 ml-3">
        {loading ? (
          <span className="animate-spin">
            <FiLoader />
          </span>
        ) : error ? (
          <p>Error: {error}</p>
        ) : tags && tags.length > 0 ? (
          tags.map((tag: string, index: number) => (
            <CarouselItem
              key={index}
              className="basis-auto bg-secondary pl-0 p-1 px-4 my-2 rounded-full bg-[#ffebb2] dark:bg-[#ffebb2]/80 dark:text-black uppercase"
            >
              <Link href={`/explore/${decodeURIComponent(tag)}`}>
                {decodeURIComponent(tag)}
              </Link>
            </CarouselItem>
          ))
        ) : null}
      </CarouselContent>
    </Carousel>
  );
}
