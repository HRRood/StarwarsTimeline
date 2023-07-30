import { prisma } from "@/lib/prisma";

interface GetMediaTypeProps {
  pageNumber: number;
  pageSize: number;
}

export async function GetMediaTypes({ pageNumber, pageSize }: GetMediaTypeProps) {
  return await prisma.mediaType.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });
}
