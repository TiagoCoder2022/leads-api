import { HttpError } from "../erros/HttpError";
import { CreateGroupAttributes, GroupsRepository } from "../repositories/GroupsRepository";

export class GroupsService {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async findAllGroups() {
    const groups = await this.groupsRepository.findAll();
    return groups;    
  }

  async createGroup(params: CreateGroupAttributes) {
    const newGroup = await this.groupsRepository.create(params);
    return newGroup;
  }

  async getGroupById(groupId: number) {
    const group = await this.groupsRepository.findById(groupId);

    if (!group) throw new HttpError(404, "Group not found");

    return group;
  }

  async updateGroupById(groupId: number, params: Partial<CreateGroupAttributes>) {
    const updatedGroup = await this.groupsRepository.updateById(groupId, params);

    if (!updatedGroup) throw new HttpError(404, "Group not found");

    return updatedGroup;
  }

  async deleteGroupById(groupId: number) {
    const deletedGroup = await this.groupsRepository.deleteById(groupId);

    if (!deletedGroup) throw new HttpError(404, "Group not found");

    return deletedGroup;
  }    
}