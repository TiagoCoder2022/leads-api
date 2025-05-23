import { prisma } from "../../database";
import { Group } from "../../generated/prisma";
import { CreateGroupAttributes, GroupRepository } from "../GroupsRepository";


export class PrismaGroupsRepository implements GroupRepository{
  findAll(): Promise<Group[]> {
    return prisma.group.findMany()
  }

  findById(id: number): Promise<Group | null> {
    return prisma.group.findUnique({
      where: { id }
    })
  }

  create(attributes: CreateGroupAttributes): Promise<Group> {
    return prisma.group.create({
      data: attributes
    })
  }

  updateById(id: number, attributes: Partial<CreateGroupAttributes>): Promise<Group | null> {
    return prisma.group.update({
      where: { id },
      data: attributes
    })
  }

  deleteById(id: number): Promise<Group | null> {
    return prisma.group.delete({
      where: { id }
    })
  }
}