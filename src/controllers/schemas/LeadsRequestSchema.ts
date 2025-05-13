import { z } from "zod";

const LeadsStatusEnum = z.enum([
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Disqualified",
  "Archived",
]);

export const GetLeadsRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  status: LeadsStatusEnum.optional(),
  sortBy: z.enum(["name", "status", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export const CreateLeadRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string(),
  status: LeadsStatusEnum.optional(),
});

export const UpdateLeadRequestSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  status: LeadsStatusEnum.optional(),
});