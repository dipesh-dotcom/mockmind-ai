import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas/register.schema";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten() },
        { status: 400 },
      );
    }

    const { name, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await hash(password, 12);

    await prisma.user.create({
      data: { name, email, passwordHash, provider: "CREDENTIALS" },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    console.error("Register error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
