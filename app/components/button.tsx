import { merge } from "~/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={merge(
        "bg-mint-600 hover:bg-mint-500 focus:ring-mint-600 focus:ring-offset-background h-10 rounded-md px-4 py-2 text-base font-semibold transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
