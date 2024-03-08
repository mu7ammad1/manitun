/* eslint-disable @next/next/no-img-element */
import Explore from "@/components/Explore/Explore";

export default function Profile({ params }: { params: { profile: string } }) {
  return (
    <main className="flex justify-center max-lg:block gap-5 my-5 mx-2">
      <div className="flex justify-center basis-1/3">
        <div className="max-w-[500px] ">
          <div className="">
            <div className=" flex justify-center">
              <img
                className="w-24 rounded-full text-center"
                src="https://stablo-pro.web3templates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=640&q=75"
                alt=""
              />
            </div>
            <h4 className="text-2xl font-bold text-center mt-2">mu7ammad</h4>
            <p className="text-sm font-normal text-left pt-4 px-2 max-lg:text-center">
              Joshua is a Microsoft Azure Certified Cloud Professional and a
              Google Certified Associate Cloud Engineer. A Data Analytics at
              Acme, specializing in the use of cloud infrastructure for Machine
              Learning and Deep Learning operation at scale.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-[800px]">
          <Explore />
        </div>
      </div>
    </main>
  );
}
