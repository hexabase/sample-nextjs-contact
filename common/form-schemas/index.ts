import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Required" }).email("This is not a valid email."),
  password: z.string().min(1, "Required"),
});

export type ILogin = z.infer<typeof loginSchema>;

