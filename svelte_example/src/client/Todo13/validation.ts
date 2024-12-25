import { z } from 'zod';

export const todoSchema = z.object({
    title: z.string().min(1, { message: 'タイトルは必須です' }),
    content: z.string().min(1, { message: '内容は必須です' }),
    content_type: z.string().optional(),
    is_public: z.boolean().optional(),
    food_orange: z.boolean().optional(),
    food_apple: z.boolean().optional(),
    food_banana: z.boolean().optional(),
    food_melon: z.boolean().optional(),
    food_grape: z.boolean().optional(),
    pub_date1: z.string().optional(),
    pub_date2: z.string().optional(),
    pub_date3: z.string().optional(),
    pub_date4: z.string().optional(),
    pub_date5: z.string().optional(),
    pub_date6: z.string().optional(),
    qty1: z.string().optional(),
    qty2: z.string().optional(),
    qty3: z.string().optional(),
    qty4: z.string().optional(),
    qty5: z.string().optional(),
    qty6: z.string().optional(),
});

export type TodoSchema = z.infer<typeof todoSchema>;