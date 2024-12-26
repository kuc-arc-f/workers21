import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です。'),
  content: z.string().min(1, '内容は必須です。'),
  public_type: z.enum(['公開', '非公開']),
  food_orange: z.boolean().optional(),
  food_apple: z.boolean().optional(),
  food_banana: z.boolean().optional(),
  pub_date1: z.string().nullable(),
  pub_date2: z.string().nullable(),
  pub_date3: z.string().nullable(),
  qty1: z.string().nullable(),
  qty2: z.string().nullable(),
  qty3: z.string().nullable(),
});

export type Todo = z.infer<typeof todoSchema> & { id: number };
export type CreateTodo = z.infer<typeof todoSchema>;
