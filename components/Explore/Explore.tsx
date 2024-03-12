/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  Key,
} from "react";
interface Article {
  [x: string]: any;
  id: string;
  title: string;
  image: string;
  content: Content[];
}

interface Content {
  id: string;
  type: string;
  props: Props;
  content: Text[];
  children: any[];
}

interface Props {
  textColor: string;
  textAlignment: string;
  backgroundColor: string;
  level?: number;
  url?: string;
  width?: number;
  caption?: string;
}

interface Text {
  text: string;
  type: string;
  styles: Styles;
}

interface Styles {}

interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string | null;
  emailVerified: string;
  image: string;
  password: string | null;
  role: string;
  isTwoFactorEnabled: boolean;
  articles: Article[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
  draft: boolean;
}

export const Element_1 = (data: {
  avatar: string | undefined;
  name: string;
  title: string;
  description: string;
  tags: string;
  image: string | undefined;
  username: any
}) => {
  return (
    <Card className="m-0 shadow-none border-none flex flex-row gap-2 hover:group-hover:bg-zinc-800">
      <CardHeader className="m-2  p-0 basis-10/12">
        <CardFooter className="text-gray-700  m-0 p-0">
          <img className="w-5 h-5 rounded-full" src={data.avatar} alt="" />
          <Link href={`/${data.username}`}>
            <span className="font-medium ml-3 text-sm capitalize">
              {data.name}
            </span>
          </Link>
        </CardFooter>
        <CardTitle>
          <Link href={`/${data.username}/${data.title}`}>
            <h1 className="text-2xl font-bold hover:underline">
              {data.title}
            </h1>
          </Link>
        </CardTitle>
        <CardDescription className="text-sm font-normal text-neutral-800/90 max-md:hidden">
          {data.description}
        </CardDescription>
        <CardDescription className="text-sm text-neutral-800/90 font-normal pt-2 flex gap-2">
          <span className="bg-neutral-100  px-5 rounded-full flex justify-center items-center">
            {data.tags}
          </span>
        </CardDescription>
      </CardHeader>
      <CardHeader className="m-5 p-0 basis-1/6 flex items-end">
        <div className="">
          <img
            className=" object-cover rounded-md object-center hover:shadow-[6px_6px_0px_0px_#3DFFDC] inset-0 duration-300 hover:scale-x-105 hover:scale-y-105 "
            src={data.image}
            alt=""
          />
        </div>
      </CardHeader>
    </Card>
  );
};



export default function Explore({ articles }: { articles?: Article[] }) {
  if (!articles || articles.length === 0) {
    return <div>No articles found.</div>;
  }

  return (
    <Card className="*:m-0 *:p-0 shadow-none border-none space-y-2 space-x-0">
      {articles && articles.map((article) => (
        <Element_1
          key={article.id}
          name={article.id}
          image={article.image}
          avatar=""
          title={article.title}
          description=""
          tags=""
          username={article.username}
        />
      ))}
    </Card>
  );
}

