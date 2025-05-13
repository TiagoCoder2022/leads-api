import { Handler } from "express";
import { prisma } from "../database";
import { CreateCampaignsRequestSchema } from "./schemas/CampaignsRequestSchema";
import { HttpError } from "../erros/HttpError";

export class CampaignsController {
  index: Handler = async (req, res, next) => {
    try {
      const campaigns = await prisma.campaign.findMany()

      res.json(campaigns)
    } catch (error) {
      next(error)
    }
  }  
}