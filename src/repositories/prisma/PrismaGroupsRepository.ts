import { prisma } from "../../database";
import { Group } from "../../generated/prisma";
import { CreateGroupAttributes, GroupsRepository } from "../GroupsRepository";

export class PrismaGroupsRepository implements GroupsRepository {
  findAll(): Promise<Group[]> {
    return prisma.group.findMany();
  }

  findById(id: number): Promise<Group | null> {
    return prisma.group.findUnique({
      where: { id },
      include: {
        leads: true,
      },
    });
  }

  create(attributes: CreateGroupAttributes): Promise<Group> {
    return prisma.group.create({
      data: attributes,
    });
  }

  updateById(
    id: number,
    attributes: Partial<CreateGroupAttributes>
  ): Promise<Group | null> {
    return prisma.group.update({
      where: { id },
      data: attributes,
    });
  }

  deleteById(id: number): Promise<Group | null> {
    return prisma.group.delete({
      where: { id },
    });
  }

  addLeadToGroup(groupId: number, leadId: number): Promise<Group> {
    return prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        leads: {
          connect: { id: leadId },
        },
      },
      include: { leads: true },
    });
  }

  removeLeadFromGroup(groupId: number, leadId: number): Promise<Group> {
    return prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        leads: {
          disconnect: { id: leadId },
        },
      },
      include: { leads: true },
    });
  }
}