const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = (process.env.PORT || 3000);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join('./src', 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "./app/public/index.html"));
});

app.listen(PORT, () => {
	console.log("Listening on port " + PORT);
});