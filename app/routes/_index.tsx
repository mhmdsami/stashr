import { redirect, LoaderFunction, MetaFunction } from "@remix-run/node";
import { getUserId } from "~/utils/session.server";
import { Form } from "@remix-run/react";
import Button from "~/components/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Stashr" },
    { name: "description", content: "Store and share your thoughts" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (!userId) {
    return redirect("/sign-in");
  }

  return null;
};

export default function Index() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-4xl font-bold">
      Stashr
      <Form method="post" action="/sign-out">
        <Button type="submit">Sign Out</Button>
      </Form>
    </div>
  );
}
