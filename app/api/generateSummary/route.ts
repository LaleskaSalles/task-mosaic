import { NextResponse } from "next/server";
import openai from "@/openai";


export async function POST(request: Request) {
    const { todos } = await request.json();

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        messages: [
            {
                role: "system",
                content: "Welcome! You can create any task you want, it's your choice – To do, In progress, or Done. Remember, the title can only have 255 characters."
            },
            {
                role: "user",
                content: `Hello! This is a program designed to assist you with organization and productivity. Here's the data: ${JSON.stringify(todos)}`
            }
        ]
    })

    return NextResponse.json(response.choices[0].message);

}  