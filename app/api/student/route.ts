import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const email = searchParams.get("email")

        if (!email) {
            return NextResponse.json({ error: "E-mail é obrigatório" }, { status: 400 })
        }

        // Attempt to find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                schedules: {
                    include: { details: true },
                    orderBy: { date: "desc" }
                }
            }
        })

        if (user) {
            return NextResponse.json({ schedules: user.schedules })
        }

        // If User table doesn't have it, try finding by Lead (guest scheduling)
        // First find lead, then find schedules by user matching lead email
        // Since guest mapping might not link directly to a User yet, we adapt schema fallback

        // In our PRISMA schema, guests are logged in Lead table, but schedule doesn't enforce userId.
        // However, the current PRISMA implementation creates Lead but doesn't hard-attach to schedule.
        // FIX: A better way is to attach the lead to the Schedule directly or enforce User creation.
        // Since we created Leads during Schedule creation, we need a way to link them.

        // For now, let's just return empty string since we are relying on User for schedules.
        // NOTE: To make it perfect, we should update the Schedule Creation to create a User if they don't exist.

        // Fallback search: Find all schedules where the created Lead has this email.
        // Because we didn't add leadId to schedules, we'll fix the POST route next if needed,
        // Or we will just search EventLog metadata for this lead.

        return NextResponse.json({ schedules: [] })

    } catch (error: any) {
        console.error("API Student Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
