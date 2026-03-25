const axios = require("axios");

/**
 * Send messages to OpenRouter API and get AI response
 * @param {Array} messages - Array of {role, content} objects
 * @returns {String} - AI response text
 */
const getAIResponse = async (messages) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/auto", // Free model
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5000", // Required by OpenRouter
          "X-Title": "Asktronaut",
        },
      },
    );

    // Extract the AI message content
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "OpenRouter API Error:",
      error.response?.data || error.message,
    );
    throw new Error("Failed to get AI response");
  }
};

module.exports = { getAIResponse };
