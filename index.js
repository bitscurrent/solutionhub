// import express from 'express';
// import TelegramBot from 'node-telegram-bot-api';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import connectDB from './config/database.js';

// dotenv.config();



// const app = express();
// const token = process.env.TOKEN;
// const port = process.env.PORT || 3000;


// // Connect to the database
// connectDB();

// // Middleware
// app.use(express.json());



// // Initialize the bot in webhook mode
// const bot = new TelegramBot(token, { webHook: true });

// // Set webhook to Render domain
// bot.setWebHook(`https://solutionhub-b9uh.onrender.com/bot${token}`);

// // Middleware to parse JSON requests
// app.use(bodyParser.json());

// // Webhook endpoint
// app.post(`/bot${token}`, (req, res) => {
//   bot.processUpdate(req.body);
//   res.sendStatus(200);
// });

// // Handle the /start command
// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, "Hello! 🚀 I'm your Telegram bot. How can I help you today?");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Bot server running on port ${port}`);
// });




import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { webhookRoute } from './controllers/botController.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Webhook route
app.post(`/bot${process.env.TOKEN}`, webhookRoute);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
