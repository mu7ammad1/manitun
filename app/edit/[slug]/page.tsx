import React from "react";
import Edits from "./edits";

export default function Edit({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Edits params={params.slug} />
    </div>
  );
}
