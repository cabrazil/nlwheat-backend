import prismaClient from "../prisma";

class CreatePlaceService {
  async execute(name: string, city: string, country: string, owner_id: string) {
    const place = await prismaClient.place.create({
      data: {
        name,
        city,
        country,
        owner_id
      },
      include: {
        owner: true
      },
    });

    return place;
  }
}

export { CreatePlaceService }