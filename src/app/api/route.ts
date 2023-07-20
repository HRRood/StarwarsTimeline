import { NextResponse } from "next/server";
import { prisma } from "../lib/prisma";

export async function GET(request: Request) {
  const events = await prisma.events.findMany({
    include: {
      EventCharacters: {
        include: {
          Characters: true,
        },
      },
    },
  });
  return NextResponse.json(events);
}
