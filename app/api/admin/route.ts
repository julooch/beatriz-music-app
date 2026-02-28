import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'

// TODO: In a real environment, add NextAuth or JWT validation here.
// For this MVP, we assume the route is accessed by the Admin (Beatriz).
export async function GET() {
    try {
        const schedules = await prisma.schedule.findMany({
            include: {
                user: true,
                details: true
            },
            orderBy: { date: "asc" }
        })

        return NextResponse.json({ schedules })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { id, status } = await req.json()

        if (!id || !status) {
            return NextResponse.json({ error: "Missing id or status" }, { status: 400 })
        }

        const updated = await prisma.schedule.update({
            where: { id },
            data: { status }
        })

        return NextResponse.json({ success: true, schedule: updated })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
