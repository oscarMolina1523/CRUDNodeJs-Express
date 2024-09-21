import z from 'zod';

const userSchema = z.object({
  completeName: z.string({
    invalid_type_error: 'Complete name must be a string',
    required_error: 'Complete name is required.'
  }),
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required.'
  }),
  email: z.string().email({
    message:'Invalid email format'
  }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(100, { message: 'Password must be at most 100 characters long' })
    .refine(value => value.trim().length > 0, {
      message: 'Password is required'
    })
});

function validateUser(input) {
  return userSchema.safeParse(input);
}

function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}

export { validateUser, validatePartialUser };

