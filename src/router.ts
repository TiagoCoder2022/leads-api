import { Router } from "express";
import { HttpError } from "./erros/HttpError";
import { LeadsController } from "./controllers/LeadsController";
import { GroupsController } from "./controllers/GroupsController";

const router = Router();

const leadsController = new LeadsController();
const groupsController = new GroupsController();

router.get("/leads", leadsController.index);
router.post("/leads", leadsController.create);
router.get("/leads/:id", leadsController.show);
router.put("/leads/:id", leadsController.update);
router.delete("/leads/:id", leadsController.show);

router.get("/groups", groupsController.index);
router.post("/groups", groupsController.create);
router.get("/groups/:id", groupsController.show);
router.put("/groups/:id", groupsController.update);
router.delete("/groups/:id", groupsController.delete);

router.get("/test", async (req, res, next) => {
 try {
  throw new HttpError(401, "nao autorizado")
  res.json({ message: "Ok"})
 } catch (error) {
  next(error)
 }
})

export { router }