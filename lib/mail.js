import { createTransport } from "nodemailer";

let cachedTrasporter

export function getMailer() {
    if (cachedTrasporter) return cachedTrasporter

    cachedTrasporter = createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_SECRET_KEY
        }
    })

    return cachedTrasporter
}