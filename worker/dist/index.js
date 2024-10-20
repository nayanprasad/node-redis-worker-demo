import { createClient } from 'redis';
const client = createClient();
async function main() {
    await client.connect();
    while (true) {
        const data = await client.BRPOP("submission", 0);
        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
}
main();
