import stylesheet from "~/styles/globals.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Toaster } from "react-hot-toast";
import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <Meta />
        <Links />
        <title>Stashr</title>
      </head>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              backgroundColor: "rgb(24 24 27)",
              color: "#d1f6ea",
              border: "1px solid rgb(55 65 81)",
            },
          }}
        />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
