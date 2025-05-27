import { prisma } from "../../database";
import { Campaign } from "../../generated/prisma";
import { CampaignsRepository, CreateCampaignAttribute } from "../CampaignsRepository";

export class PrismaCampaignsRepository implements CampaignsRepository {
  find(): Promise<Campaign[]> {
    return prisma.campaign.findMany()
  }

  findById(id: number):Promise<Campaign | null> {
    return prisma.campaign.findUnique({
      where: { id },
      include: {
        leads: {
          include: {
            lead: true
          }
        }
      }
    })
  }

  create(attributes: CreateCampaignAttribute): Promise<Campaign> {
    return prisma.campaign.create({
      data: attributes
    })
  }

  async updateById(id: number, attributes: Partial<CreateCampaignAttribute>): Promise<Campaign | null> {
    const campaignExists = await prisma.campaign.findUnique({ where: { id }})
    if (!campaignExists) return null
    return prisma.campaign.update({
      where: { id },
      data: attributes
    })
  }
  
  async deleteById(id: number): Promise<Campaign | null> {
    const campaignExists = await prisma.campaign.findUnique({ where: { id }})
    if (!campaignExists) return null
    return prisma.campaign.delete({
      where: { id }      
    })
  }
}