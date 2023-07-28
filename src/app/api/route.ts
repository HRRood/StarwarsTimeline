import { GetFullEventsData } from "@/repository/events/getFullEventsData";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const events = await GetFullEventsData();
  return NextResponse.json(events);
}
