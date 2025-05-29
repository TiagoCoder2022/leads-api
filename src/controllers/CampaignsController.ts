import { Handler } from "express";
import {
  CreateCampaignsRequestSchema,
  UpdateCampaignsRequestSchema,
} from "./schemas/CampaignsRequestSchema";
import { CampaignsService } from "../services/CampaignsService";

export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  index: Handler = async (req, res, next) => {
    try {
      const campaigns = await this.campaignsService.findAllCampaigns();
      res.json(campaigns);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateCampaignsRequestSchema.parse(req.body);
      const newCampaign = await this.campaignsService.createCampaign(body);
      res.json(newCampaign);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const campaign = await this.campaignsService.getCampaignById(
        +req.params.id
      );

      res.json(campaign);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = UpdateCampaignsRequestSchema.parse(req.body);

      const updatedCampaign = await this.campaignsService.updateCampaignById(
        id,
        body
      );

      res.json(updatedCampaign);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const deletedCampaign = await this.campaignsService.deleteCampaignById(
        id
      );

      res.json({ deletedCampaign });
    } catch (error) {
      next(error);
    }
  };
}
