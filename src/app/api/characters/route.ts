import { prisma } from "@/lib/prisma";
import { GetCharacters } from "@/repository/characters/getCharacters";
import { mapZodErrorIssues } from "@/utils/mapZodErrorIssues";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const events = await GetCharacters({ pageNumber: 1, pageSize: 10 });
  return NextResponse.json(events);
}

interface PostBody {
  name: string;
  description: string;
  imageUrl?: string;
}

const CharacterDataValidation = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  imageUrl: z.string().optional(),
});

export async function POST(request: Request) {
  const { name, description, imageUrl = "" }: PostBody = await request.json();
  const body = CharacterDataValidation.safeParse({ name, description, imageUrl });

  if (!body.success) {
    return NextResponse.json(
      {
        success: false,
        errors: mapZodErrorIssues(body.error.issues),
      },
      { status: 404 }
    );
  }

  const characterWithSameName = await prisma.characters.findFirst({
    where: {
      name: body.data.name,
    },
  });
  if (characterWithSameName) {
    return NextResponse.json({
      success: false,
      error: "Charaxcter with name already exists",
    });
  }

  const createdResponse = await prisma.characters
    .create({
      data: {
        name: body.data.name,
        description: body.data.description,
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
      console.log(error);
      return {
        success: false,
        error: errorMessage,
      };
    });

  return NextResponse.json(createdResponse);
}
