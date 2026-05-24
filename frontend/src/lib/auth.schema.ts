import { z } from "zod";

// Password Regex: At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special symbol
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(60, "First name cannot exceed 60 characters"),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(60, "Last name cannot exceed 60 characters"),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(255),
    countryCode: z
      .string()
      .min(1, "Country code is required"),
    mobile: z
      .string()
      .trim()
      .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    country: z
      .string()
      .min(1, "Please select a country"),
    state: z
      .string()
      .min(1, "Please select a state"),
    city: z
      .string()
      .min(1, "Please select a city"),
    ageGroup: z
      .enum(["upto25", "25to50", "over50"], {
        required_error: "Please select an age group",
      }),
    category: z
      .enum(["Member", "Volunteer", "Lead"], {
        required_error: "Please select a sign-up category",
      }),
    interests: z
      .array(z.string())
      .min(1, "Pick at least 1 interest")
      .max(3, "You can only pick up to 3 interests"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
    confirmPassword: z.string(),
    consent: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must agree to the terms to sign up.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255),
  password: z
    .string()
    .min(1, "Password is required"),
});