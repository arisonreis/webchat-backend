import { z } from 'zod';

export const dataSchema = z.object({
  name: z.string().max(100, 'maximum 100 letters').min(1, 'min 1 letter'),
  email: z
    .string({ invalid_type_error: 'invalid type' })
    .email({ message: 'invalid Format' })
    .optional(),
  perfil_url: z
    .string({ invalid_type_error: 'invalid type' })
    .url({ message: 'invalid Format' })
    .optional()
});
