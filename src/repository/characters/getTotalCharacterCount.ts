import { prisma } from "@/lib/prisma";

export async function GetTotalCharactersCount() {
  return await prisma.characters.count();
}
