import { prisma } from "@/lib/prisma";
import { GetEvents } from "@/stores/events/getEvents";
import { mapZodErrorIssues } from "@/utils/mapZodErrorIssues";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const events = await GetEvents({ pageNumber: 1, pageSize: 10 });
  return NextResponse.json(events);
}

// interface PostBody {
//   title: string;
//   description: string;
//   fromDate: number;
//   toDate: number;
//   imageUrl?: string;
// }

const PostBody = z.object({
  title: z.string(),
  description: z.string(),
  fromDate: z.number(),
  toDate: z.number(),
  imageUrl: z.string().optional(),
});

export async function POST(request: Request) {
  const { title, description, fromDate, toDate, imageUrl = "" } = await request.json();
  const body = PostBody.safeParse({ title, description, fromDate, toDate, imageUrl });

  if (!body.success) {
    return NextResponse.json(
      {
        success: false,
        errors: mapZodErrorIssues(body.error.issues),
      },
      { status: 404 }
    );
  }

  const eventWithSameTitle = await prisma.events.findFirst({
    where: {
      title: body.data.title,
    },
  });
  if (eventWithSameTitle) {
    return NextResponse.json({
      success: false,
      error: "Event with title already exists",
    });
  }

  const createdResponse = await prisma.events
    .create({
      data: {
        title: body.data.title,
        description: body.data.description,
        fromDate: body.data.fromDate,
        toDate: body.data.toDate,
        imageUrl: body.data.imageUrl,
      },
    })
    .then((res) => {
      return {
        success: true,
        data: res,
      };
    })
    .catch((error) => {
      let errorMessage = "Something went wrong";
      return {
        success: false,
        error: errorMessage,
      };
    });

  return NextResponse.json(createdResponse);
}
