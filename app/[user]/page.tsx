"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Explore from "@/components/Explore/Explore";
import { Button } from "@/components/ui/button";

export default function User({ params }: { params: { user: string } }) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/profile/${params.user}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setUserData(null); // Reset user data if not found
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <main className="flex justify-center max-lg:block gap-5 my-5 mx-2">
      <div className="flex justify-center basis-1/3">
        <div className="max-w-[500px] ">
          <div className="">
            <div className="flex justify-center">
              <img
                className="w-24 rounded-full text-center"
                src={userData && userData.image}
                alt=""
              />
            </div>
            <h4 className="text-2xl font-bold text-center mt-2">
              {userData && userData.username}
            </h4>
            <Button>
              <input type="submit" value="Follow" />
            </Button>
            <p className="text-sm font-normal flex justify-start pt-4 px-2 max-lg:text-center">
              <span>{userData && userData.bio}</span>
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
