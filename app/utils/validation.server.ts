import {
  email,
  minLength,
  object,
  parse,
  string,
  ValiError,
  Output,
  BaseSchema,
} from "valibot";

const SignUpSchema = object({
  name: string("Name is required", [
    minLength(3, "Name must be at least 3 characters"),
  ]),
  email: string("Email is required", [
    email("Please enter a valid email address"),
  ]),
  password: string("Password is required", [
    minLength(8, "Password must be at least 8 characters"),
  ]),
});

const SignInSchema = object({
  email: string("Email is required", [
    email("Please enter a valid email address"),
  ]),
  password: string("Password is required", [
    minLength(3, "Password is required"),
  ]),
});

const CreateNoteSchema = object({
  title: string("Title is required", [
    minLength(3, "Title must be at least 3 characters"),
  ]),
  body: string("Body is required", [
    minLength(3, "Body must be at least 3 characters"),
  ]),
});

type ValidatedForm<Schema extends BaseSchema> =
  | {
      success: true;
      data: Output<Schema>;
    }
  | {
      success: false;
      errors: Record<string, string>;
    };

const validateForm =
  <T extends BaseSchema>(schema: T) =>
  (data: Record<string, unknown>): ValidatedForm<T> => {
    try {
      const parsed = parse(schema, data);
      return { success: true, data: parsed };
    } catch (error) {
      if (error instanceof ValiError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path) {
            errors[String(issue.path[0].key)] = issue.message;
          }
        });
        return { success: false, errors: errors };
      }

      return { success: false, errors: { error: "Something went wrong" } };
    }
  };

export const validateSignUp = validateForm(SignUpSchema);
export const validateSignIn = validateForm(SignInSchema);
export const validateCreateNote = validateForm(CreateNoteSchema);
