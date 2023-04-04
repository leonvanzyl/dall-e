const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request) {
  const { prompt } = await request.json();

  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });

  return new Response(JSON.stringify({ data: response.data.data }));
}
