import { Group } from "../generated/prisma";

export interface CreateGroupAttributes {
  name: string
  description: string
}

export interface GroupsRepository {
  findAll: () => Promise<Group[]>;
  findById: (id: number) => Promise<Group | null>;
  create: (attributes: CreateGroupAttributes) => Promise<Group>;
  updateById: (
    id: number,
    attributes: Partial<CreateGroupAttributes>
  ) => Promise<Group | null>;
  deleteById: (id: number) => Promise<Group | null>;
  addLeadToGroup: (groupId: number, leadId: number) => Promise<Group>;
  removeLeadFromGroup: (groupId: number, leadId: number) => Promise<Group>;
}