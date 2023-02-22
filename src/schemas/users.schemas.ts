import { hashSync } from "bcryptjs";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email(),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean().optional(),
});

export const returnUserSchema = createUserSchema.extend({
  id: z.number(),
  active: z.boolean(),
});
export const allUserSchema = z.array(returnUserSchema);

export const userOmitPassword = returnUserSchema.omit({ password: true });

export const updateSchema = createUserSchema.partial().omit({ admin: true });
