import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatDistanceToNow } from "date-fns";
import { arEG } from "date-fns/locale";

export default function ViewArticle({
  id,
  image,
  title,
  created,
  description,
  tags1,
  tags2,
  username,
  avatar,
}: any) {
  return (
    <Link href={`/shot/${id}`}>
      <Card className="flex items-start justify-end border-none shadow-none hover:bg-stone-100 dark:bg-stone-950 dark:hover:bg-stone-900 px-3 py-5 gap-x-2 group">
        {image ? (
          <CardContent className="basis-1/4 max-sm:basis-1/4 p-0">
            {/* eslint-disable-next-line @next/next/no-img-element  */}
            <img
              src={image}
              alt={id}
              className="w-full max-h-28 rounded-md object-cover object-center group-hover:scale-105 scale-100 group-hover:ease-in duration-300"
            />
          </CardContent>
        ) : null}
        <CardHeader
          className={`basis-3/4 max-sm:basis-3/4 p-0 text-wrap *:text-right`}
        >
          <CardTitle className="text-xs" lang="ar">
            {formatDistanceToNow(new Date(created), {
              addSuffix: true,
              locale: arEG,
            })}
          </CardTitle>
          <CardTitle
            className="text-base tracking-wide leading-relaxed line-clamp-2 max-md:line-clamp-1 max-sm:line-clamp-2"
            lang="ar"
          >
            {title}
          </CardTitle>
          <CardDescription
            className="text-sm tracking-wide leading-relaxed line-clamp-3 max-sm:hidden pt-1"
            lang="ar"
          >
            {description}
          </CardDescription>
          <CardFooter className="p-0 flex justify-end items-start gap-x-2 pt-1">
            {tags1 ? (
              <Link
                href={`tag/${tags1}`}
                className="bg-stone-200 dark:bg-stone-800 px-3 py-[2px] rounded-full text-xs max-sm:hidden"
              >
                {tags1}
              </Link>
            ) : null}
            {tags2 ? (
              <Link
                href={`tag/${tags2}`}
                className="bg-stone-200 dark:bg-stone-800 px-3 py-[2px] rounded-full text-xs max-sm:hidden"
              >
                {tags2}
              </Link>
            ) : null}
            <Link href={`${username}`} className="flex items-center gap-x-3">
              <p className="text-sm">{username}</p>
              {avatar ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={avatar}
                  alt={username}
                  className="w-5 h-5 rounded-full object-cover object-center"
                />
              ) : null}
            </Link>
          </CardFooter>
        </CardHeader>
      </Card>
    </Link>
  );
}
