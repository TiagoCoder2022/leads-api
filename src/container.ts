import { LeadsController } from "./controllers/LeadsController";
import { GroupsController } from "./controllers/GroupsController";
import { CampaignsController } from "./controllers/CampaignsController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupLeadsController } from "./controllers/GroupLeadsController";
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository";
import { PrismaGroupsRepository } from "./repositories/prisma/PrismaGroupsRepository";
import { PrismaCampaignsRepository } from "./repositories/prisma/PrismaCampaignsRepository";
import { LeadsService } from "./services/LeadsService";
import { GroupsService } from "./services/GroupsService";
import { CampaignsService } from "./services/CampaignsService";
import { GroupLeadsService } from "./services/GroupLeadsService";

export const leadsRepository = new PrismaLeadsRepository();
export const groupsRepository = new PrismaGroupsRepository();
export const campaignsRepository = new PrismaCampaignsRepository();

export const leadsService = new LeadsService(leadsRepository);
export const groupsService = new GroupsService(groupsRepository);
export const campaignsService = new CampaignsService(campaignsRepository);
export const groupLeadsService = new GroupLeadsService(
  groupsRepository,
  leadsRepository
);

export const leadsController = new LeadsController(leadsService);
export const groupsController = new GroupsController(groupsService);
export const campaignsController = new CampaignsController(campaignsService);
export const campaignLeadsController = new CampaignLeadsController(
  campaignsRepository,
  leadsRepository
);
export const groupLeadsController = new GroupLeadsController(groupLeadsService);