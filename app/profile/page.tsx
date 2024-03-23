"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

export default function Page() {
  const user = useCurrentUser();
  const [formData, setFormData] = useState({
    image: "" || `${user?.image}`,
    name: "" || `${user?.name}`,
    username: "" || user?.username,
    bio: "" || user?.bio,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target!;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const target = event!.target!;
        setFormData((prevData) => ({
          ...prevData,
          [name]: target.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://manitun.vercel.app/api/user/${user?.username}`,
        formData
      );
      toast.success("تم تغيير ملوماتك بنجاح");
    } catch (error) {
      toast.error("حدث خطأ داخلي يرجوا اتصال بي");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-5 *:space-y-2"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="image" className="text-right">Picture</Label>
            <Input
              id="image"
              type="file"
              name="image"
              defaultValue={formData.image}
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name" className="text-right">اسمك</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-right"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username" className="text-right">اسم المستخدم</Label>
            <Input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="text-right"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="bio" className="text-right">موجز</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="text-right h-32"
            />
          </div>
          <button type="submit" className="text-center">حفظ</button>
        </form>
      </div>
    </div>
  );
}
