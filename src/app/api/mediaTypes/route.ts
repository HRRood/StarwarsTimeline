import { prisma } from "@/lib/prisma";
import { GetMediaTypes } from "@/repository/mediaTypes/getMediaTypes";
import { mapZodErrorIssues } from "@/utils/mapZodErrorIssues";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const events = await GetMediaTypes({ pageNumber: 1, pageSize: 10 });
  return NextResponse.json(events);
}

interface PostBody {
  name: string;
}

const EventsDataValidation = z.object({
  name: z.string().nonempty(),
});

export async function POST(request: Request) {
  const { name }: PostBody = await request.json();
  const body = EventsDataValidation.safeParse({ name });

  if (!body.success) {
    return NextResponse.json(
      {
        success: false,
        errors: mapZodErrorIssues(body.error.issues),
      },
      { status: 404 }
    );
  }

  const mediaTypeWithSameTitle = await prisma.mediaType.findFirst({
    where: {
      name: body.data.name,
    },
  });
  if (mediaTypeWithSameTitle) {
    return NextResponse.json({
      success: false,
      error: "Media type with name already exists",
    });
  }

  const createdResponse = await prisma.mediaType
    .create({
      data: {
        name: body.data.name,
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
      console.log(error);
      return {
        success: false,
        error: errorMessage,
      };
    });

  return NextResponse.json(createdResponse);
}
