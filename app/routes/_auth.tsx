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
    <main className="mx-auto flex h-screen w-72 flex-col items-center justify-center">
      <Outlet />
    </main>
  );
}
