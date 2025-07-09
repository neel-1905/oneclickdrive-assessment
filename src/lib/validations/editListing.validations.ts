import { z } from "zod";

export const editListingSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Max 50 characters allowed."),

  location: z
    .string()
    .min(1, "Location is required.")
    .max(100, "Max 100 characters allowed."),

  price_per_day: z.coerce
    .number({
      required_error: "Price per day is required.",
      invalid_type_error: "Price must be a number.",
    })
    .min(0, "Price must be greater than 0."),

  status: z.enum(["pending", "approved", "rejected"], {
    required_error: "Status is required.",
    invalid_type_error: "Invalid status value.",
  }),
});
