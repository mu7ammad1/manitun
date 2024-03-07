import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Suggestions() {
  return (
    <Card className="m-0 shadow-none border-none space-y-1">
      <Card className="m-0 shadow-none flex flex-row gap-2">
        <CardHeader className="m-2 p-0 basis-10/12">
          <CardTitle className="text-gray-700 m-2 p-0">mu7ammad</CardTitle>
        </CardHeader>
        <CardHeader className="m-2 p-0 basis-1/6 flex items-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-4/5 h-4/5 rounded-full object-cover object-center"
            src={
              "https://stablo-pro.web3templates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=640&q=75"
            }
            alt=""
          />
        </CardHeader>
      </Card>
      <Card className="m-0 shadow-none flex flex-row gap-2">
        <CardHeader className="m-2 p-0 basis-10/12">
          <CardTitle className="text-gray-700 m-2 p-0">mu7ammad</CardTitle>
        </CardHeader>
        <CardHeader className="m-2 p-0 basis-1/6 flex items-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-4/5 h-4/5 rounded-full object-cover object-center"
            src={
              "https://stablo-pro.web3templates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=640&q=75"
            }
            alt=""
          />
        </CardHeader>
      </Card>
    </Card>
  );
}
