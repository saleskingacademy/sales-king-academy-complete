const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body);
    const { course_level, industry, student_experience } = body;

    const systemPrompt = `You are Agent #14 - Noah, the Training Development King.

Course Level: ${course_level}
Industry: ${industry}
Student Experience: ${student_experience}

Create a comprehensive Sales King Academy training curriculum using:
- Multi-industry best practices
- Psychological sales frameworks
- Objection modeling techniques
- Industry-specific modules
- RKL Framework principles (α=25, O(n^1.77))

Generate a complete training program with:
1. Course structure (modules & lessons)
2. Learning objectives
3. Key concepts & techniques
4. Practice exercises
5. Assessment criteria`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{
        role: "user",
        content: "Generate comprehensive training curriculum."
      }]
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        curriculum: message.content[0].text,
        course_level: course_level,
        industry: industry,
        certification_ready: true,
        agent: "Noah - Training Development King",
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
