import React from "react";
import Toggle from "./follow";

export default function User_details_section({ Author }: any) {
  return (
    <section className={`py-2 flex flex-col justify-center items-center`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://cdn.dribbble.com/userupload/8726278/file/original-ab1bde6f9c74de5c8961f7fe84990cd4.gif"
        alt="https://cdn.dribbble.com/userupload/8726278/file/original-ab1bde6f9c74de5c8961f7fe84990cd4.gif"
        className="rounded-full w-16 h-16 object-cover object-center mb-2"
      />
      <div className={`flex items-center gap-2`}>
        <h1 className={`text-xl font-medium`}>{Author}</h1>
      </div>
    </section>
  );
}
