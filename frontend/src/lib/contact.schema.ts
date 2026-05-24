import z from "zod";


export const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(140),
  message: z.string().trim().min(5, "A little more, please").max(1000),
});