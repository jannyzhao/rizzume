export const runtime = "edge";
// openAI API setup
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const getAIResponse = async (resumeText: string, jobDescription: string) => {
  const response = await openai.completions.create({
    model: "text-davinci-003",
    prompt: `Assume the role of a bot that outputs 3 suggestions to make a resume match a job description better. Each suggestion must only be a single paragraph. Separate each suggestion with a |. Here's the job description: \"${jobDescription}\" and here's the resume: \"${resumeText}\"`,
    temperature: 0,
    max_tokens: 200,
  });

  return response.choices[0].text;
};

export default getAIResponse;
