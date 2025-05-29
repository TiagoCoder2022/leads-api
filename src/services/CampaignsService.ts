import { HttpError } from "../erros/HttpError";
import { CampaignsRepository, CreateCampaignAttributes } from "../repositories/CampaignsRepository";

export class CampaignsService {
  constructor(private readonly campaignsRepository: CampaignsRepository) {}

  async findAllCampaigns() {
    const campaigns = await this.campaignsRepository.find();
    return campaigns;
  }

  async createCampaign(params: CreateCampaignAttributes) {
    const newCampaign = await this.campaignsRepository.create(params);
    return newCampaign;
  }

  async getCampaignById(campaignId: number) {
    const campaign = await this.campaignsRepository.findById(campaignId);
    if (!campaign) throw new HttpError(404, "Campaign not found");
    return campaign;
  }

  async updateCampaignById(campaignId: number, params: Partial<CreateCampaignAttributes>) {
    const updatedCampaign = await this.campaignsRepository.updateById(campaignId, params);
    if (!updatedCampaign) throw new HttpError(404, "Campaign not found");
    return updatedCampaign;
  }
  
  async deleteCampaignById(campaignId: number) {
    const deletedCampaign = await this.campaignsRepository.deleteById(campaignId);
    if (!deletedCampaign) throw new HttpError(404, "Campaign not found");
    return deletedCampaign;
  }
}