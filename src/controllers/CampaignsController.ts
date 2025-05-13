import { Handler } from "express";
import { prisma } from "../database";
import { CreateCampaignsRequestSchema } from "./schemas/CampaignsRequestSchema";
import { HttpError } from "../erros/HttpError";

export class CampaignsController {
  index: Handler = async (req, res, next) => {
    try {
      const campaigns = await prisma.campaign.findMany();

      res.json(campaigns);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateCampaignsRequestSchema.parse(req.body);

      const newCampaign = await prisma.campaign.create({
        data: body,
      });

      res.status(201).json(newCampaign);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const campaign = await prisma.campaign.findUnique({
        where: { id },
      });

      if (!campaign) throw new HttpError(404, "Campaign not found");

      res.json(campaign);
    } catch (error) {
      next(error);
    }
  };
}