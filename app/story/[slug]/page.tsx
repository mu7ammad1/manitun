import React from "react";
import Storys from "./storys";

export default function Story({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Storys params={params.slug}/>
    </div>
  );
}