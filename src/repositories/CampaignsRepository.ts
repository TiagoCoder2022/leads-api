import { string } from "zod";
import { Campaign } from "../generated/prisma";

export interface CreateCampaignAttribute {
  name: string
  description: string
  startDate: Date 
  endDate?: Date
}
export interface CampaignsRepository {
  find: () => Promise<Campaign[]>
  findById: (id: number) => Promise<Campaign | null>
  create: (attributes: CreateCampaignAttribute) => Promise<Campaign>
  updateById: (id: number, attributes: Partial<CreateCampaignAttribute>) => Promise<Campaign | null>
  deleteById: (id: number) => Promise<Campaign | null>
}