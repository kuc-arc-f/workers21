import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

export type Todo = z.infer<typeof todoSchema>;