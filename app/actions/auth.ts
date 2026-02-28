"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
    const password = formData.get("password")

    // Check against environment variable or hardcoded fallback
    if (password === (process.env.ADMIN_PASSWORD || "BeatrizCantora")) {
        cookies().set("admin_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        })
        redirect("/admin/painel")
    }

    return { error: "Senha incorreta." }
}

export async function logoutAction() {
    cookies().delete("admin_session")
    redirect("/admin")
}
