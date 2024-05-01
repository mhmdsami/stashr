import { LoaderFunction } from "@remix-run/node";
import { getUserId } from "~/utils/session.server";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/dashboard");
  }

  return null;
};

export default function Auth() {
  return (
    <main className="h-screen flex flex-col items-center justify-center w-72 mx-auto">
      <Outlet />
    </main>
  );
}
