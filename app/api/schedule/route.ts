import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { rateLimit } from "@/lib/rateLimit"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
        if (!rateLimit(ip, 10, 60000)) {
            return NextResponse.json({ error: "Muitas solicitações. Tente novamente em 1 minuto." }, { status: 429 })
        }

        const data = await req.json()
        const { action, payload } = data

        // Handle Funnel Event Tracking
        if (action === "TRACK_EVENT") {
            const { eventType, sessionId, metadata } = payload
            await prisma.eventLog.create({
                data: {
                    eventType,
                    sessionId,
                    metadata: metadata || {}
                }
            })
            return NextResponse.json({ success: true })
        }

        // Handle Schedule Creation
        if (action === "CREATE_SCHEDULE") {
            const { email, name, phone, date, isBeginner, goal, improvement, sessionId } = payload

            // 1. Create or Find User
            let user = await prisma.user.findUnique({
                where: { email }
            })

            if (!user) {
                user = await prisma.user.create({
                    data: { email, name, role: "STUDENT" }
                })
            }

            // 1.5 Create or Find Lead
            let lead = await prisma.lead.findUnique({
                where: { email }
            })

            if (!lead) {
                lead = await prisma.lead.create({
                    data: { email, name, phone, source: "scheduling_form" }
                })
            }

            // 2. Log completion event
            await prisma.eventLog.create({
                data: {
                    eventType: "COMPLETED_SCHEDULING",
                    sessionId,
                    userId: user.id,
                    metadata: { leadId: lead.id }
                }
            })

            // 3. Create Schedule with pre-questions details
            const schedule = await prisma.schedule.create({
                data: {
                    date: new Date(date),
                    userId: user.id,
                    details: {
                        create: {
                            isBeginner,
                            goal,
                            improvement
                        }
                    }
                }
            })

            return NextResponse.json({ success: true, scheduleId: schedule.id })
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    } catch (error: any) {
        console.error("API Schedule Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
