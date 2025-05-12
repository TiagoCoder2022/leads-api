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