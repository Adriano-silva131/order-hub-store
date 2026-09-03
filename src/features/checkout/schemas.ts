import { z } from "zod";

export const addressSchema = z.object({
  recipient: z.string().min(2, { error: "Informe o nome de quem recebe." }),
  phone: z.string().min(8, { error: "Informe um telefone válido." }),
  zip: z.string().min(8, { error: "Informe um CEP válido." }),
  street: z.string().min(3, { error: "Informe a rua." }),
  number: z.string().min(1, { error: "Informe o número." }),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, { error: "Informe o bairro." }),
  city: z.string().min(2, { error: "Informe a cidade." }),
  state: z.string().length(2, { error: "UF com 2 letras (ex.: SP)." }),
});

export type AddressInput = z.infer<typeof addressSchema>;
