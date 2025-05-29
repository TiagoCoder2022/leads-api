import { LeadStatus } from "../generated/prisma";
import { GroupsRepository } from "../repositories/GroupsRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";

interface GroupLeadsPaginationParams {
  page?: number;
  pageSize?: number;
  name?: string;
  status?: LeadStatus;
  sortBy: "name" | "status" | "createdAt";
  order?: "asc" | "desc";
  groupId?: number;
}

export class GroupLeadsService {
  constructor(
    private readonly groupsRepository: GroupsRepository,
    private readonly leadsRepository: LeadsRepository
  ) {}

  async getAllLeads(params: GroupLeadsPaginationParams) {
    const groupId = params.groupId;
    const {name, status, page = 1, pageSize = 10, sortBy, order} = params;
    const limit = pageSize;
    const offset = (page - 1) * limit;

    const where: LeadWhereParams = { groupId };

    if (name) where.name = { like: name, mode: "insensitive" };
    if (status) where.status = status;

    const leads = await this.leadsRepository.find({
      where,
      sortBy,
      order,
      limit,
      offset,
      include: { groups: true },
    });

    const total = await this.leadsRepository.count(where);

    return {
      leads,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async addLeadToGroup(groupId: number, leadId: number) {    
    const updatedGroup = await this.groupsRepository.addLeadToGroup(
      groupId,
      leadId
    );
    
    return updatedGroup;
  }

  async removeLeadFromGroup(groupId: number, leadId: number) {
    const updatedGroup = await this.groupsRepository.removeLeadFromGroup(
      groupId,
      leadId
    );
    return updatedGroup;
  }
}