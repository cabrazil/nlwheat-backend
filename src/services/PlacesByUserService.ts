import prismaClient from "../prisma";

class PlacesByUserService {
  async execute(user_id: string) {
    const places = await prismaClient.place.findMany({
      where: {
        id: user_id,
      },
      orderBy: {
        name: "asc",
      },
    });

    return places;
  }
}

export { PlacesByUserService };