import { Router } from "express";
import { HttpError } from "./erros/HttpError";
import { LeadsController } from "./controllers/LeadsController";

const router = Router()

const leadsController = new LeadsController();

router.get("/leads", leadsController.index);
router.post("/leads", leadsController.create);
router.get("/leads/:id", leadsController.show);
router.delete("/leads/:id", leadsController.show);

router.get("/test", async (req, res, next) => {
 try {
  throw new HttpError(401, "nao autorizado")
  res.json({ message: "Ok"})
 } catch (error) {
  next(error)
 }
})

export { router }