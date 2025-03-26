// openai.js

require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Function to interact clearly with OpenAI's ChatGPT
async function askGPT(conversationHistory) {
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: conversationHistory,
    functions: [
      {
        name: "search_flights",
        description: "Clearly search flights via Duffel",
        parameters: {
          type: "object",
          properties: {
            origin: { type: "string" },
            destination: { type: "string" },
            departure_date: { type: "string" },
            return_date: { type: "string" },
            passengers: { type: "number" },
            cabin_class: { type: "string" }
          },
          required: ["origin", "destination", "departure_date", "passengers", "cabin_class"]
        }
      },
      {
        name: "book_flight",
        description: "Book clearly flight with given offer and traveler info",
        parameters: {
          type: "object",
          properties: {
            offer_id: { type: "string" },
            traveler_info: { type: "object" },
            payment_token: { type: "string" }
          },
          required: ["offer_id", "traveler_info", "payment_token"]
        }
      }
    ],
    function_call: "auto"
  });

  return completion.data.choices[0].message;
}

module.exports = { askGPT };
