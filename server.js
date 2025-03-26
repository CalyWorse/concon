const express = require('express');
const { Rcon } = require('rcon-client');

const app = express();
app.use(express.json());

async function sendCommand(command) {
    const rcon = new Rcon({
        host: process.env.RCON_HOST,
        port: Number(process.env.RCON_PORT),
        password: process.env.RCON_PASSWORD
    });

    try {
        await rcon.connect();
        const response = await rcon.send(command);
        rcon.end();
        return response;
    } catch (error) {
        console.error("RCON Error:", error);
        return "Ошибка подключения к RCON";
    }
}

app.post('/send_command', async (req, res) => {
    if (!req.body.command) return res.status(400).send("No command provided");

    const result = await sendCommand(req.body.command);
    res.send(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
