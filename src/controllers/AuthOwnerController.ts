import { Request, Response} from "express";
import { AuthOwnerService } from "../services/AuthOwnerService";

class AuthOwnerController {
  async handle(request: Request, response: Response) {
    const { code } = request.body;

    const service = new AuthOwnerService();
    try {
      const result = await service.execute(code);
      return response.json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}

export { AuthOwnerController }