const express = require('express');
const { Rcon } = require('rcon-client');

const app = express();
app.use(express.json());

async function sendCommand(command) {
    const rcon = new Rcon({
        host: "185.17.10.84",
        port: 25575,
        password: "5423423"
    });
    await rcon.connect();
    const response = await rcon.send(command);
    rcon.end();
    return response;
}

app.post('/send_command', async (req, res) => {
    if (!req.body.command) return res.status(400).send("No command provided");
    try {
        const result = await sendCommand(req.body.command);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
