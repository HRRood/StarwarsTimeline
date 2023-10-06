import { prisma } from "@/lib/prisma";
import { GetCharacters } from "@/repository/characters/getCharacters";
import { GetTotalCharactersCount } from "@/repository/characters/getTotalCharacterCount";
import { createDefaultResponse } from "@/utils/defaulrResponse";
import { mapZodErrorIssues } from "@/utils/mapZodErrorIssues";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  //queryParams for page number and page size
  const { searchParams } = new URL(request.url);
  const pageNumber = parseInt(searchParams.get("pageNumber") ?? "1");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const characters = await GetCharacters({ pageNumber, pageSize });
  const totalCount = await GetTotalCharactersCount();
  const totalPages = Math.ceil(totalCount / pageSize);
  const nextPage = pageNumber + 1;
  const previousPage = pageNumber - 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPreviousPage = previousPage >= 1;
  const pagination = {
    currentPage: pageNumber,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    totalPages,
    totalCount,
  };
  return NextResponse.json(createDefaultResponse({ characters, pagination }));
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
