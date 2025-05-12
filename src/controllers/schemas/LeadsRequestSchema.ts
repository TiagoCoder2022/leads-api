import { z } from "zod";

export const CreateLeadRequestSchema =  z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string(),
  status: z.enum([
    "New",
    "Contacted",
    "Qualified",
    "Converted",
    "Disqualified",
    "Archived",
  ]).optional()
})

export const UpdateLeadRequestSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  status: z
    .enum([
      "New",
      "Contacted",
      "Qualified",
      "Converted",
      "Disqualified",
      "Archived",
    ])
    .optional(),
});