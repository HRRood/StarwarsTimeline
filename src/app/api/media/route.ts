import { prisma } from "@/lib/prisma";
import { GetMedia } from "@/repository/media/getMedia";
import { mapZodErrorIssues } from "@/utils/mapZodErrorIssues";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const events = await GetMedia({ pageNumber: 1, pageSize: 10 });
  return NextResponse.json(events);
}

interface PostBody {
  title: string;
  description: string;
  mediaTypeId: number;
  releaseDate: Date;
  imageUrl?: string;
  dateFrom: number;
  dateTo: number;
}

const EventsDataValidation = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  mediaTypeId: z.number().int(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional(),
  dateFrom: z.coerce.number(),
  dateTo: z.coerce.number(),
});

export async function POST(request: Request) {
  const { title, description, dateFrom, dateTo, mediaTypeId, releaseDate, imageUrl }: PostBody = await request.json();
  const body = EventsDataValidation.safeParse({ title, description, dateFrom, dateTo, mediaTypeId, releaseDate, imageUrl });

  if (!body.success) {
    return NextResponse.json(
      {
        success: false,
        errors: mapZodErrorIssues(body.error.issues),
      },
      { status: 404 }
    );
  }

  const mediaTypeWithSameTitle = await prisma.media.findFirst({
    where: {
      title: body.data.title,
    },
  });
  if (mediaTypeWithSameTitle) {
    return NextResponse.json({
      success: false,
      error: "Media with name already exists",
    });
  }

  const createdResponse = await prisma.media
    .create({
      data: {
        title: body.data.title,
        description: body.data.description,
        mediaTypeId: body.data.mediaTypeId,
        releaseDate: body.data.releaseDate,
        imageUrl: body.data.imageUrl,
        dateFrom: body.data.dateFrom,
        dateTo: body.data.dateTo,
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
