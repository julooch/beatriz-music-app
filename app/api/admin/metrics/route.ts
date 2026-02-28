import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const startDateParam = searchParams.get('startDate');
        const endDateParam = searchParams.get('endDate');

        let dateFilter = {};
        if (startDateParam && endDateParam) {
            dateFilter = {
                createdAt: {
                    gte: new Date(startDateParam),
                    lte: new Date(endDateParam + "T23:59:59.999Z") // end of the day
                }
            };
        }

        // 1. Visit Tracking (Visualizações do site)
        const siteViews = await prisma.eventLog.count({
            where: { eventType: "SITE_VIEW", ...dateFilter }
        });

        // 2. Average Session Time
        const sessions = await prisma.eventLog.findMany({
            where: { eventType: "SESSION_DURATION", ...dateFilter },
            select: { metadata: true }
        });

        let totalDuration = 0;
        let validSessions = 0;
        sessions.forEach(s => {
            const duration = (s.metadata as any)?.durationMinutes;
            if (typeof duration === 'number') {
                totalDuration += duration;
                validSessions++;
            }
        });
        const avgSessionMinutes = validSessions > 0 ? (totalDuration / validSessions).toFixed(1) : "0";

        // 3. Funnel and Schedules
        const totalVisits = await prisma.eventLog.count({ where: { eventType: "STARTED_SCHEDULING", ...dateFilter } })
        const totalLeads = await prisma.lead.count({ where: dateFilter })
        const totalCompleted = await prisma.eventLog.count({ where: { eventType: "COMPLETED_SCHEDULING", ...dateFilter } })

        const pendingSchedules = await prisma.schedule.count({ where: { status: "PENDING", ...dateFilter } })
        const confirmedSchedules = await prisma.schedule.count({ where: { status: "CONFIRMED", ...dateFilter } })
        const rejectedSchedules = await prisma.schedule.count({ where: { status: "REJECTED", ...dateFilter } })

        // 4. Detailed Clicks
        const clicksAgendar = await prisma.eventLog.count({ where: { eventType: "CLICK_AGENDAR", ...dateFilter } })
        const clicksSobre = await prisma.eventLog.count({ where: { eventType: "CLICK_SOBRE", ...dateFilter } })
        const clicksMetodologia = await prisma.eventLog.count({ where: { eventType: "CLICK_METODOLOGIA", ...dateFilter } })
        const clicksDepoimentos = await prisma.eventLog.count({ where: { eventType: "CLICK_DEPOIMENTOS", ...dateFilter } })

        return NextResponse.json({
            metrics: {
                siteViews,
                avgSessionMinutes,
                totalVisits,
                totalCompleted,
                abandonmentRate: siteViews > 0 ? (((siteViews - totalCompleted) / siteViews) * 100).toFixed(1) + "%" : "0%",
                totalLeads,
                pendingSchedules,
                confirmedSchedules,
                rejectedSchedules,
                clicksAgendar,
                clicksSobre,
                clicksMetodologia,
                clicksDepoimentos
            }
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
