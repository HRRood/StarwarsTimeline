import { prisma } from "@/lib/prisma";

interface GetCharactersProps {
  pageNumber: number;
  pageSize: number;
}

export async function GetCharacters({ pageNumber, pageSize }: GetCharactersProps) {
  return await prisma.characters.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });
}
