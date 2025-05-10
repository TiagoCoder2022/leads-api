import { Router } from "express";
import { HttpError } from "./erros/HttpError";

const router = Router()

router.get("/test", async (req, res, next) => {
 try {
  throw new HttpError(401, "nao autorizado")
  res.json({ message: "Ok"})
 } catch (error) {
  next(error)
 }
})

export { router }