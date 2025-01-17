import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 處理 GET 請求，回傳所有工作職缺
export async function GET() {
  try {
    const jobs = await prisma.company.findMany();
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
