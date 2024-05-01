import { ActionFunction, redirect, json, MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import Button from "~/components/button";
import Input from "~/components/input";
import useActionDataWithToast from "~/hooks/use-action-data-with-toast";
import { createUserSession, getUserId, signIn } from "~/utils/session.server";
import { validateSignIn } from "~/utils/validation.server";

export const meta: MetaFunction = () => [
  { title: "Sign In | Stashr" },
  {
    name: "description",
    content: "Sign in to your account",
  },
];

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (userId) {
    return redirect("/");
  }

  const formData = await request.formData();
  const body = Object.fromEntries(formData);

  const parseRes = validateSignIn(body);
  if (!parseRes.success) {
    return json({ fieldErrors: parseRes.errors }, { status: 400 });
  }

  const { email, password } = parseRes.data;
  const res = await signIn(email, password);
  if (!res.success) {
    return json({ error: res.error }, { status: 400 });
  }

  return createUserSession(res.data.id);
};

export default function SignIn() {
  const actionData = useActionDataWithToast();

  return (
    <Form className="flex w-full flex-col gap-2" method="post">
      <h1 className="text-center text-3xl font-bold">Welcome Back!</h1>
      <div className="flex w-full flex-col gap-3">
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
        <Button type="submit">Sign In</Button>
      </div>
      <Link to="/sign-up" className="text-center text-xs underline">
        Don't have an account? Create one now!
      </Link>
    </Form>
  );
}
