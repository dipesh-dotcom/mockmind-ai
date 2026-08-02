
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas/auth.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const { name, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "An account with this email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const passwordHash = await hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        provider: "CREDENTIALS",
      },
    });

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 201,
      }
    );
    
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
