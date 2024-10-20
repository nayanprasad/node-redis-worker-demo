import express, {Request, Response} from "express"
import {createClient} from "redis";


const app = express();

app.use(express.json())

const client = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

app.post("/submit", async (req: Request, res: Response) => {
    try {
        const {id} = req.body
        await client.lPush("submission", JSON.stringify(id))

        res.status(200).json({
            success: true
        })

    } catch (err) {
        res.status(500).json({
            success: false
        })
    }
})


app.listen(6000)
