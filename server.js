const STRIPE_SECRET_KEY = "";

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const port = process.env.PORT || 4242;

app.use(bodyParser.json());

app.get("/api/stripe-public-key", (req, res) => {
	res.send({ publicKey: STRIPE_PUBLISHABLE_KEY });
});

app.post("/api/create-payment-intent", async (req, res) => {
	const options = req.body;
	console.log(options);

	try {
		const paymentIntent = await stripe.paymentIntents.create(options);
		res.json(paymentIntent);
	} catch (err) {
		res.json(err);
	}
});

const root = require("path").join(__dirname, "client", "build");
app.use(express.static(root));
app.get("*", (req, res) => {
	res.sendFile("index.html", { root });
});

app.listen(port, () => console.log(`Node server listening on port ${port}!`));
