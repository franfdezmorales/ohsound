
import { getMailer } from "lib/mail"



const getFormattedRank = (data) => {
    let emoji

    for (const rank of data) {
        if (rank.selected) {
            emoji = rank.emojiToRender
            break
        }
    }

    return emoji
}


export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(403).end()

    try {

        const data = JSON.parse(req.body)
        const formattedRanking = getFormattedRank(data.ranking)

        const mailer = getMailer()
        const mailOptions = {
            from: 'franfdezmorales@gmail.com',
            to: 'franfdezmorales@gmail.com',
            subject: `NEW FEEDBACK RECEIVED`,
            text: `
            • Sender: ${data.name}
            • Feedback: ${data.feedback}
            • Ranking: ${formattedRanking}
            `
        }

        const response = await mailer.sendMail(mailOptions)
        res.status(200).json({response})

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}
