import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email invalido"),
    password: z
      .string()
      .min(6, "La contrasena debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contrasenas no coinciden",
    path: ["confirmPassword"],
  });

export const influencerOnboardingSchema = z.object({
  bio: z
    .string()
    .min(10, "La bio debe tener al menos 10 caracteres")
    .max(500, "La bio no puede superar los 500 caracteres"),
  niche: z
    .array(z.string())
    .min(1, "Selecciona al menos un nicho"),
  country: z.string().min(1, "Selecciona un pais"),
  city: z.string().optional(),
  socialLinks: z
    .array(
      z.object({
        platform: z.enum([
          "INSTAGRAM",
          "TIKTOK",
          "YOUTUBE",
          "TWITTER",
          "FACEBOOK",
        ]),
        url: z.string().url("URL invalida"),
        username: z.string().min(1, "Username requerido"),
        followers: z
          .number()
          .min(0, "Seguidores debe ser un numero positivo"),
      })
    )
    .min(1, "Agrega al menos una red social"),
});

export const sellerOnboardingSchema = z.object({
  companyName: z
    .string()
    .min(2, "El nombre de la empresa debe tener al menos 2 caracteres"),
  website: z.string().url("URL invalida").optional().or(z.literal("")),
  industry: z.string().min(1, "Selecciona una industria"),
  country: z.string().min(1, "Selecciona un pais"),
  description: z
    .string()
    .min(10, "La descripcion debe tener al menos 10 caracteres")
    .max(1000, "La descripcion no puede superar los 1000 caracteres"),
  meliSellerId: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type InfluencerOnboardingInput = z.infer<
  typeof influencerOnboardingSchema
>;
export type SellerOnboardingInput = z.infer<typeof sellerOnboardingSchema>;
