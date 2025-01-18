import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id, 10);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // 查詢資料庫中的 profile 和 resume
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true, resume: true }, // 假設 `profile` 和 `resume` 是關聯的
    });

    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
