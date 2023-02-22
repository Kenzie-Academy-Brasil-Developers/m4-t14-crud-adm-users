import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schemas";

export type ILoginRequest = z.infer<typeof createLoginSchema>;
