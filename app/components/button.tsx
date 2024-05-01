import { merge } from "~/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={merge(
        "focus:ring-offset-background h-10 rounded-lg bg-gradient-to-bl from-wewak-600 to-wewak-900 px-4 py-1 text-base font-semibold text-wewak-50 focus:outline-none focus:ring-1 focus:ring-wewak-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
