import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'

// GET: List all deletion requests (admin only, protected by middleware)
export async function GET() {
    try {
        const requests = await prisma.dataDeletionRequest.findMany({
            orderBy: { createdAt: "desc" }
        })

        const pendingCount = requests.filter(r => r.status === "PENDING").length

        return NextResponse.json({ requests, pendingCount })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// PATCH: Process a deletion request (delete user data + mark as completed)
export async function PATCH(req: Request) {
    try {
        const { requestId } = await req.json()

        if (!requestId) {
            return NextResponse.json({ error: "requestId é obrigatório." }, { status: 400 })
        }

        // Find the deletion request
        const deletionRequest = await prisma.dataDeletionRequest.findUnique({
            where: { id: requestId }
        })

        if (!deletionRequest) {
            return NextResponse.json({ error: "Solicitação não encontrada." }, { status: 404 })
        }

        const email = deletionRequest.email

        // Delete user data across all tables
        // 1. Delete leads with this email
        await prisma.lead.deleteMany({ where: { email } })

        // 2. Find user by email
        const user = await prisma.user.findUnique({ where: { email } })

        if (user) {
            // 3. Delete schedule details for user's schedules
            const schedules = await prisma.schedule.findMany({
                where: { userId: user.id },
                select: { id: true }
            })

            for (const schedule of schedules) {
                await prisma.scheduleDetails.deleteMany({
                    where: { scheduleId: schedule.id }
                })
            }

            // 4. Delete schedules
            await prisma.schedule.deleteMany({ where: { userId: user.id } })

            // 5. Delete event logs associated with userId
            await prisma.eventLog.deleteMany({ where: { userId: user.id } })

            // 6. Delete user
            await prisma.user.delete({ where: { id: user.id } })
        }

        // Mark the request as completed
        await prisma.dataDeletionRequest.update({
            where: { id: requestId },
            data: { status: "COMPLETED" }
        })

        return NextResponse.json({ success: true, deletedEmail: email })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
