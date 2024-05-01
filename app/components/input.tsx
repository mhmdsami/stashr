import { merge } from "~/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  errorMessage?: string;
}

export default function Input({ label, className, labelClassName, errorMessage, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className={labelClassName}>{label}</label>}
      <input
        className={merge(
          "focus:border-emerald-600 focus:ring-emerald-600 flex h-10 w-full rounded-lg border border-gray-700 bg-zinc-900 px-3 py-2 text-sm transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
