import { Router } from "express";
import { AuthOwnerController } from "./controllers/AuthOwnerController";
import { AuthUserController } from "./controllers/AuthUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { CreatePlaceController } from "./controllers/CreatePlaceController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { ensureAuthOwner } from "./middleware/ensureAuthOwner";

const router = Router();

router.post("/authenticate", new AuthUserController().handle);

router.post("/authowner", new AuthOwnerController().handle);

router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);

router.post("/places", ensureAuthOwner, new CreatePlaceController().handle);

router.get("/messages/last3", new GetLast3MessagesController().handle);

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router }

