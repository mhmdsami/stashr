import { redirect, LoaderFunction } from "@remix-run/node";
import { getUserId } from "~/utils/session.server";
import { Form, Link, Outlet } from "@remix-run/react";
import Button from "~/components/button";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (!userId) {
    return redirect("/sign-in");
  }

  return null;
};

export default function DashboardLayout() {
  return (
    <>
      <nav className="flex justify-between p-10">
        <Link to="/dashboard" className="text-4xl font-bold text-emerald-400">
          stashr
        </Link>
        <Form method="post" action="/sign-out">
          <Button>Sign Out</Button>
        </Form>
      </nav>
      <Outlet />
    </>
  );
}
