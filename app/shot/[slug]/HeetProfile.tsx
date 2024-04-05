import Image from "next/legacy/image";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { formatDistanceToNow } from "date-fns";
import { arEG } from "date-fns/locale";

const ShareBTN = dynamic(() => import("./ShareBTN"), { ssr: false });
const Follow = dynamic(() => import("./follow"), { ssr: false });
const Comment = dynamic(() => import("./comment"), { ssr: false });
const Like = dynamic(() => import("./like"), { ssr: false });

export default function HeetProfile({ Author, name, date, slug }: any) {
  const lazyRoot = React.useRef(null);

  return (
    <div className="flex justify-between items-center my-7">
      <div className="flex justify-center items-center gap-2">
        <Suspense fallback={<span>ShareBTN.....</span>}>
          <ShareBTN />
        </Suspense>
        <Suspense fallback={<span>Comment.....</span>}>
          <Comment articleId={slug} />
        </Suspense>
        <Suspense fallback={<span>Comment.....</span>}>
          <Like articleIda={slug} />
        </Suspense>
      </div>
      <div ref={lazyRoot} className="flex items-center gap-3">
        <Suspense fallback={<span>Follow.....</span>}>
          <Follow IdAuthor={Author} />
        </Suspense>
        <div className="flex flex-col justify-end">
          <h1 className="text-base text-right">{name}</h1>
          <p className="text-xs text-right">
            {formatDistanceToNow(new Date(date), {
              addSuffix: true,
              locale: arEG,
            })}
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          loading="lazy"
          lazyRoot={lazyRoot}
          src={`https://lh3.googleusercontent.com/a/ACg8ocLdQXFN0ps1Sv1Udct4qS2K38qrWBx3JXRkpuGr0ueO=s96-c`}
          width={32}
          height={32}
          alt="Picture of the author"
          className="rounded-full"
        />
      </div>
    </div>
  );
}
