import { z } from "zod";

const optionalPositiveNumber = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return undefined;
  const num = Number(val);
  return isNaN(num) ? undefined : num;
}, z.number().min(1, "Deve ser maior que 0").optional());

export const planSchema = z.object({
  id: z.string().optional(),
  reason: z.string().min(1, "Nome do plano é obrigatório"),
  back_url: z.url({ protocol: /^https$/, message: "URL Inválida — deve usar HTTPS" }),
  auto_recurring: z.object({
    transaction_amount: z.number("Preço é obrigatório").min(1),
    frequency: z.number().min(1),
    frequency_type: z.enum(["days", "months"]),
    repetitions: optionalPositiveNumber,
    free_trial: z
      .object({
        frequency: optionalPositiveNumber,
        frequency_type: z.enum(["days", "months"]),
      })
      .optional(),
  }),
});
