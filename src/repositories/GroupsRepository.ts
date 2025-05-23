import { Group } from "../generated/prisma";

export interface CreateGroupAttributes {
  name: string
  description: string
}

export interface GroupRepository {
  findAll: () => Promise<Group[]>
  findById: (id: number) => Promise<Group | null>
  create: (attributes: CreateGroupAttributes) => Promise<Group>
  updateById: (id: number, attributes: Partial<CreateGroupAttributes>) => Promise<Group | null>
  deleteById: (id: number) => Promise<Group | null>
}