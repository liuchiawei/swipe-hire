"use client";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";

export default function MyPage() {
  const [user, setUser] = useState<User | null>(null);
  const userId = 1; // default user id for testing

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        if (!data.error) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUserData();
  }, [userId]);

  if (!user) return <div className="text-neutral-700">Loading...</div>;

  return (
    <div className="w-full h-full">
      <div className="w-full h-[320px] relative">
        <div className="w-full h-1/2 bg-primary"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center gap-2">
          <Avatar
            sx={{
              width: 120,
              height: 120,
            }}
            alt="リュウチャーウェイ"
            src="/static/images/avatar/1.jpg"
          />
          <div className="flex flex-col justify-center items-center mb-8">
            <h1 className="text-2xl font-bold">リュウチャーウェイ</h1>
            <h2 className="text-md text-neutral-500">ウェブデザイナー</h2>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-8">
        <div className="max-w-[1080px] h-screen w-4/5 flex flex-col justify-center items-center bg-white rounded-3xl">
          履歴書
        </div>
      </div>
    </div>
  );
}
