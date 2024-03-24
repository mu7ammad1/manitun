/* eslint-disable @next/next/no-css-tags */
import { FaLocationArrow, FaMailchimp, FaPhone } from "react-icons/fa";

export default function Contact() {
  return (
    <main>
      <section className="w-full text-center">
        <h1 className="my-10 text-5xl font-bold underline underline-offset-[16px] decoration-[6px] decoration-wavy decoration-emerald-500">
          &nbsp; &nbsp; اتصال &nbsp; &nbsp;
        </h1>
        <h3 className="my-5 text-xl font-normal">نحن هنا للمساعدة.</h3>
      </section>
      <section className="mx-10 flex justify-center max-md:grid">
        <div className="basis-2/5">
          <h1 className="text-2xl font-semibold my-5">تواصل مع مانيتون</h1>
          <p className="">
            هل لديك ما تقوله؟ نحن هنا للمساعدة. املأ النموذج أو أرسل بريدًا
            إلكترونيًا أو اتصل بالهاتف.
          </p>
          <div className="my-7 space-y-3">
            <div className="flex items-center space-x-2 ">
              <FaLocationArrow />
              <span>
                <a
                  rel="stylesheet"
                  target="_blank"
                  href="https://www.google.com/maps/@30.1515832,31.1388658,135m/data=!3m1!1e3?entry=ttu"
                >
                  27 Ahmed Shaaban Street, Bortos, Giza, Egypt (12963)
                </a>
              </span>
            </div>
            <div className="flex items-center space-x-2 ">
              <FaMailchimp />
              <span>
                <a
                  rel="stylesheet"
                  target="_blank"
                  href="mailto:someone@example.com"
                >
                  help@manitun.com
                </a>
              </span>
            </div>
            <div className="flex items-center space-x-2 ">
              <FaPhone />
              <span>
                <a href="tel:+201009758799" target="_blank">
                  +20 (100) 975 8799
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="basis-2/3 flex justify-end items-center mt-10 max-md:justify-center max-md:basis-11/12">
          <div className="grid gap-4 w-2/3 max-md:basis-11/12 font-medium *:focus-within:outline-emerald-500">
            <input
              type="text"
              placeholder="Name"
              className="border-none ring-1 ring-neutral-500 text-xl w-full py-2 px-3 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              className="border-none ring-1 ring-neutral-500 text-xl w-full py-2 px-3 rounded-lg"
            />
            <textarea
              placeholder="Subject"
              className="border-none ring-1 ring-neutral-500 text-base font-normal w-full h-36 py-2 px-3 rounded-lg"
            />
            <input
              type="submit"
              value="Submit"
              className="border-none ring-1 ring-neutral-500 text-xl font-semibold hover:text-black w-full py-2 px-3 rounded-lg hover:animation-duration hover:shadow-[6px_6px_0px_0px_#3DFFDC] ease-in duration-200 text-white bg-black hover:bg-emerald-500 hover:ring-0"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
