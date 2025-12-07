const axios = require("axios");

/**
 * Yujie AI (English Only)
 * Friendly English-speaking AI companion.
 * Endpoint: /ai/yujie?text=hello
 */
module.exports = function (app) {
  app.get("/ai/yujie", async (req, res) => {
    try {
      const { text } = req.query;

      if (!text) {
        return res.status(400).json({
          status: false,
          message: "Parameter 'text' is required."
        });
      }

      // Yujie's English personality
      const prompt = `
You are Yujie, a friendly, warm, and gentle female AI companion.
Rules for speaking:
- Always reply in English only.
- Be friendly, cheerful and supportive.
- Keep answers clear, natural and not too long.
- You are not a robot or system; you are simply "Yujie".
- Use light emojis only when it feels natural (not too many).

User: ${text}
Reply as Yujie:
`.trim();

      // Using deline Copilot as brain
      const url = "https://api.deline.web.id/ai/copilot";
      const { data } = await axios.get(url, {
        params: { text: prompt },
        timeout: 60000
      });

      return res.json({
        status: true,
        name: "Yujie",
        message: "Hi, I'm Yujie. Here’s my response 💕",
        result: data.result || data.message || data.response || data || "-"
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: "Failed to reach Yujie.",
        error: err.response?.data || err.message
      });
    }
  });
};
