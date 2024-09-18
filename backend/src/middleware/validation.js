import z from "zod";
export const SignUpValidator = (req, res, next) => {
  const body = req.body;
  const signupSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  });
//   console.log(body)
  const parsedInput = signupSchema.safeParse(body);
//   console.log(parsedInput);
  if (!parsedInput.success) {
    return res.status(400).json({ message: "Invalid Input" });
  }
  next();
};

export const SignInValidator = (req, res, next) => {
  const body = req.body;
  const signinSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
  });

  const parsedInput = signinSchema.safeParse(body);
  if (!parsedInput.success) {
    return res.status(400).json({ message: "Invalid Input" });
  }
  next();
};
