import { prisma } from "@/lib/prisma";

export async function GetFullEventsData() {
  return await prisma.events.findMany({
    include: {
      EventCharacters: {
        include: {
          Characters: true,
        },
      },
      MediaEvents: {
        include: {
          Media: {
            include: {
              MediaType: true,
            },
          },
        },
      },
    },
  });
}
