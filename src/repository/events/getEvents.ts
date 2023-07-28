import { prisma } from "@/lib/prisma";

interface GetEventsProps {
  pageNumber: number;
  pageSize: number;
}

export async function GetEvents({ pageNumber, pageSize }: GetEventsProps) {
  return await prisma.events.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });
}
