import { Link } from "@remix-run/react";
import Button from "~/components/button";

export default function Index() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold text-wewak-400">stashr</h1>
        <p className="text-xl font-medium text-wewak-100">
          Store and share your thoughts!
        </p>
      </div>
      <Link to="/sign-up">
        <Button>Get Started</Button>
      </Link>
    </main>
  );
}
