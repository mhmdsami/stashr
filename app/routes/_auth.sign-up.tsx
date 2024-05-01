import { ActionFunction, redirect, json, MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import Button from "~/components/button";
import Input from "~/components/input";
import useActionDataWithToast from "~/hooks/use-action-data-with-toast";
import { createUserSession, getUserId, signUp } from "~/utils/session.server";
import { validateSignUp } from "~/utils/validation.server";

export const meta: MetaFunction = () => [
  { title: "Sign Up | Stashr" },
  {
    name: "description",
    content: "Sign up",
  },
];

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (userId) {
    return redirect("/");
  }

  const formData = await request.formData();
  const body = Object.fromEntries(formData);

  const parseRes = validateSignUp(body);
  if (!parseRes.success) {
    return json({ fieldErrors: parseRes.errors }, { status: 400 });
  }

  const { name, email, password } = parseRes.data;
  const res = await signUp(name, email, password);
  if (!res.success) {
    return json({ error: res.error }, { status: 400 });
  }

  return createUserSession(res.data.id);
};

export default function SignUp() {
  const actionData = useActionDataWithToast();

  return (
    <Form className="flex w-full flex-col gap-2" method="post">
      <h1 className="text-center text-3xl font-bold">Welcome Abode!</h1>
      <div className="flex w-full flex-col gap-3">
        <Input
          type="text"
          name="name"
          label="Name"
          placeholder="Noor"
          errorMessage={actionData?.fieldErrors?.name}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="noor@srmkzilla.net"
          errorMessage={actionData?.fieldErrors?.email}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          errorMessage={actionData?.fieldErrors?.password}
        />
        <Button type="submit">Sign Up</Button>
      </div>
      <Link to="/sign-in" className="text-center text-xs underline">
        Already have an account? Sign In
      </Link>
    </Form>
  );
}
