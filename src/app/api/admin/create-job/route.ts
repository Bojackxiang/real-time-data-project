import { NextResponse } from "next/server"
import db from '@/lib/prisma'

export async function POST(request: Request) {
  try {

    const { url, jobType } = await request.json();
    const response = await db.jobs.create({
      data: {
        url,
        jobType
      }
    })

    return NextResponse.json(
      {
        jobCreated: true,
      },
      { status: 201 }
    );

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500
    })
  }
}
