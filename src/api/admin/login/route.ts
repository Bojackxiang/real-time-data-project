import { NextResponse } from "next/server"
import db from '@/lib/prisma'
import { SignJWT } from 'jose'
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_KEY as string);
const alg = "HS256";
const createToken = async (email: string, userId: number) => {
  return await new SignJWT({ email, userId, isAdmin: true })
    .setProtectedHeader({ alg })
    .setExpirationTime("48h")
    .sign(secret);
};


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({
        error: "Email and password are required",
        status: 400
      })
    }

    const foundUser = await db.admin.findUnique({
      where: {
        email,
        password,
      }
    })
    if (!foundUser) {
      return NextResponse.json({
        error: "Invalid email or password",
        status: 404
      })
    } else {
      const token = await createToken(foundUser.email, foundUser.id);
      cookies().set("access_token", token);

      return NextResponse.json(
        {
          access_token: token,
          userInfo: {
            id: foundUser.id,
            email: foundUser.email,
          },
        },
        { status: 200 }
      );
    }


  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500
    })
  }
}