import { NextResponse } from "next/server"
import db from '@/lib/prisma'

export async function GET() {
  try {
    const jobs = await db.jobs.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    const onGoingJobs = await db.jobs.findMany({
      where: {
        isComplete: false
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(
      {
        success: true,
        jobs,
        onGoingJobs: onGoingJobs?.length ?? 0
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