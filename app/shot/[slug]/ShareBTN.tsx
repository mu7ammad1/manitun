import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share1Icon } from "@radix-ui/react-icons";
import { CiShare2 } from "react-icons/ci";
import {
  FaCopy,
  FaFacebook,
  FaTwitter,
  FaTwitch,
  FaWhatsapp,
} from "react-icons/fa";
import { toast } from "sonner";

export default function ShareBTN() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className="rounded-full">
          <Share1Icon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-5">اختار طريقة المشاركة</DialogTitle>
          <DialogDescription className="flex gap-3">
            <Button
              className="flex justify-center items-center gap-3"
              variant={"secondary"}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast("تم نسخ الرابط بنجاح");
              }}
            >
              <FaCopy />
            </Button>
            <DialogFooter className="bg-secondary flex justify-center items-center w-full rounded-md">
              <p className="px-1">{window.location.href.substring(0, 45)}...</p>
            </DialogFooter>
          </DialogDescription>
          <DialogDescription className="grid grid-cols-3 max-md:grid-cols-2 pt-5 gap-2">
            <Button
              className="flex justify-center items-center gap-3"
              variant={"secondary"}
              onClick={() =>
                window.open(
                  "https://www.facebook.com/sharer/sharer.php?u=" +
                    encodeURIComponent(window.location.href)
                )
              }
            >
              <FaFacebook />
              <span>FaceBook</span>
            </Button>
            <Button
              className="flex justify-center items-center gap-3"
              variant={"secondary"}
              onClick={() =>
                window.open(
                  "https://twitter.com/intent/tweet?url=" +
                    encodeURIComponent(window.location.href)
                )
              }
            >
              <FaTwitter />
              <span>Twitter</span>
            </Button>
            <Button
              className="flex justify-center items-center gap-3"
              variant={"secondary"}
              onClick={() => window.open("https://www.twitch.tv/your_channel")}
            >
              <FaTwitch />
              <span>Twitch</span>
            </Button>
            <Button
              className="flex justify-center items-center gap-3"
              variant={"secondary"}
              onClick={() =>
                window.open(
                  "whatsapp://send?text=" +
                    encodeURIComponent(window.location.href)
                )
              }
            >
              <FaWhatsapp />
              <span>Whatsapp</span>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
