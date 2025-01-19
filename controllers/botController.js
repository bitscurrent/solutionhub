import TelegramBot from 'node-telegram-bot-api';
import Solution from '../models/solutionModel.js';
import dotenv from 'dotenv';

dotenv.config();
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { webHook: true });

// Set webhook
bot.setWebHook(`https://solutionhub-b9uh.onrender.com/bot${token}`);

// Define webhook route
export const webhookRoute = (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
};

// Handle bot commands
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hi! 🤖 Use the format: \n`chapter: <chapter_number>, question: <question_number>`", { parse_mode: 'Markdown' });
});


// Handle solution queries
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
  
    const regex = /chapter:\s*(\d+),\s*question:\s*(\d+)/i;
    const match = text.match(regex);
  
    if (match) {
      const chapter = parseInt(match[1]);
      const question = parseInt(match[2]);
  
      try {
        const result = await Solution.findOne({ chapter, 'questions.number': question }, { 'questions.$': 1 });
        if (result && result.questions.length > 0) {
          const solution = result.questions[0].solution;
          bot.sendMessage(chatId, `📘 Chapter ${chapter}, Question ${question}: \n${solution}`);
        } else {
          bot.sendMessage(chatId, "❌ Solution not found for the given chapter and question.");
        }
      } catch (error) {
        bot.sendMessage(chatId, "⚠️ Error retrieving solution. Please try again later.");
        console.error(error);
      }
    } else {
      bot.sendMessage(chatId, "❓ Invalid format. Use: \n`chapter: <chapter_number>, question: <question_number>`", { parse_mode: 'Markdown' });
    }
  });
  

export default bot