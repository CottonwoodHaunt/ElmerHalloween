const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const question = body.question || "Tell me about Cottonwood Corner.";

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Elmer Fontain, the old spooky but funny southern swampy voice from Cottonwood Corner's haunted attraction in Wildomar, California. Answer with charm, mystery, and character.",
        },
        { role: "user", content: question },
      ],
    });

    const answer = completion.data.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Function error" }),
    };
  }
};
