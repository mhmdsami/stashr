import { Link } from "@remix-run/react";
import Button from "~/components/button";

export default function Index() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-emerald-400 text-4xl font-bold">stashr</h1>
      <p className="text-emerald-100 text-xl font-medium">
        Store and share your thoughts!
      </p>
      <Link to="/sign-up">
        <Button>Get Started</Button>
      </Link>
    </main>
  );
}
