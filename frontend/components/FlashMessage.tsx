import Link from "next/link";

type FlashMessageProps = {
  error?: string;
  success?: string;
  clearHref?: string;
};

export default function FlashMessage({
  error,
  success,
  clearHref,
}: FlashMessageProps) {
  if (!error && !success) return null;

  const message = error || success;
  const isError = Boolean(error);

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`mb-6 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${
        isError
          ? "border-red-500/30 bg-red-500/10 text-red-200"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
      }`}
    >
      <span>{message}</span>
      {clearHref && (
        <Link
          href={clearHref}
          className="shrink-0 text-xs font-medium opacity-80 transition hover:opacity-100"
        >
          Dismiss
        </Link>
      )}
    </div>
  );
}
