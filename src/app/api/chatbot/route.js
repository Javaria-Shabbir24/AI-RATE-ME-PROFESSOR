import { NextResponse } from "next/server";

// Hardcoded responses based on professor names and questions
const responses = {
  "What is the name of the professor good at Math?": "Charles Mathew is known for their exceptional skills in Mathematics.",
  "Tell me about Professor B.": "Professor B is well-regarded for their expertise in Computer Science and engaging teaching methods.",
  "Who teaches the best English class?": "George. Jr is highly praised for their English classes, known for their depth of knowledge and interactive lectures.",
  "How is Professor D in Chemistry?": "Professor D is considered average in Chemistry. While knowledgeable, their classes can be a bit challenging to follow.",
  "Rate Professor A": "Professor A has an excellent rating of 4.8/5 for their Mathematics classes. They are highly recommended.",
  "Rate Professor B": "Professor B is rated 4.2/5. They are good in Computer Science but can sometimes be disorganized.",
  "What is Professor C's rating?": "Professor C is rated 4.0/5. Their English classes are well-received, though some find their pace a bit fast.",
  "Is Professor D a good professor?": "Professor D is rated 3.1/5. They are average, with mixed reviews from students.",
};

// Store previous messages in-memory
const previousMessages = new Set();

export async function POST(request) {
  try {
    // Parse incoming JSON request body
    const { message } = await request.json();

    // Validate message
    if (!message) {
      return NextResponse.json({ reply: "No message provided!" }, { status: 400 });
    }

    // Check if the message has been handled before
    if (previousMessages.has(message)) {
      return NextResponse.json({ reply: "You have already asked this question." });
    }

    // Add the message to the set of handled messages
    previousMessages.add(message);

    // Check for hardcoded responses
    const reply = responses[message] || "Sorry, I don't have information on that topic.";

    return NextResponse.json({ reply });

  } catch (error) {
    // Log and handle errors
    console.error("Error handling the request:", error.message);
    return NextResponse.json({ reply: "Sorry, something went wrong!" }, { status: 500 });
  }
}
