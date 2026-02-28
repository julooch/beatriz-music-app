// Simple in-memory rate limiter for serverless environments
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(ip: string, maxRequests: number = 30, windowMs: number = 60000): boolean {
    const now = Date.now()
    const entry = rateLimitMap.get(ip)

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
        return true // allowed
    }

    if (entry.count >= maxRequests) {
        return false // blocked
    }

    entry.count++
    return true // allowed
}

// Cleanup old entries periodically to prevent memory leaks
setInterval(() => {
    const now = Date.now()
    for (const [ip, entry] of rateLimitMap.entries()) {
        if (now > entry.resetTime) {
            rateLimitMap.delete(ip)
        }
    }
}, 60000)
