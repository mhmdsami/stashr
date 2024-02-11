import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Stashr" },
    { name: "description", content: "Store and share your thoughts" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-4xl font-bold">
      Stashr
    </div>
  );
}
