import { z } from "zod";

export const CreateGroupRequestSchema = z.object({
  name: z.string().min(2),
  description: z.string(),
})

export const UpdateGroupRequestSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
})

export const AddLeadRequestSchema = z.object({
  leadId: z.number(),
});