import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface GetMediaProps {
  pageNumber: number;
  pageSize: number;
}

export type MediaWithMediaType = Prisma.MediaGetPayload<{
  include: {
    MediaType: {
      select: {
        name: true;
      };
    };
  };
}>;

export async function GetMedia({ pageNumber, pageSize }: GetMediaProps): Promise<MediaWithMediaType[]> {
  return await prisma.media.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
    include: {
      MediaType: {
        select: {
          name: true,
        },
      },
    },
  });
}
