import { Request, Response} from "express";
import { CreatePlaceService } from "../services/CreatePlaceService";

class CreatePlaceController {
  async handle(request: Request, response: Response) {
    const { name, city, country } = request.body;
    const { owner_id } = request;

    const service = new CreatePlaceService();

    const result = await service.execute(name, city, country, owner_id);

    return response.json(result);
  }
}

export { CreatePlaceController }