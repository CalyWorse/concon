const express = require('express');
const bodyParser = require('body-parser');
const Rcon = require('rcon-client').Rcon;

const app = express();
const port = 10000;

app.use(bodyParser.json()); // Обязательно для парсинга JSON

app.post('/send_command', async (req, res) => {
    try {
        const { command } = req.body; // Получаем команду из запроса
        if (!command) {
            return res.status(400).send("Ошибка: команда не указана!");
        }

        const rcon = await Rcon.connect({
            host: "ТВОЙ_IP",
            port: 25575,
            password: "ТВОЙ_ПАРОЛЬ"
        });

        const response = await rcon.send(command);
        await rcon.end();

        res.send({ message: "Команда выполнена", response });
    } catch (error) {
        res.status(500).send("Ошибка выполнения команды: " + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
