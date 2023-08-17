
import "dotenv/config";
import express from "express";
import * as PayPal from "./paypal-api.js";
const { PORT = 8888 } = process.env;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// render checkout page with client id & unique client token
app.get("/", async (req, res) => {
  const clientId = process.env.CLIENT_ID;
  try {
    const clientToken = await PayPal.generateClientToken();
    res.render("checkout", {
      clientId,
      clientToken,
    })
  } catch (err) {
    res.status(500).send(err.message);
  }
})

// create order
app.post("/api/orders", async (req, res) => {
  try {
    const order = await PayPal.createOrder();
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
})

// capture payment
app.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  try {
    const captureData = await PayPal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
})
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`);
})
    