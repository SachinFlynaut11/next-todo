import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import FlashMessage from "@/components/FlashMessage";
import { updateTodoAction } from "@/app/actions/todo";
import { fetchTodoById } from "@/lib/api-server";

type EditTodoPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditTodoPage({
  params,
  searchParams,
}: EditTodoPageProps) {
  const { id } = await params;
  const query = await searchParams;

  let todo = null;
  try {
    todo = await fetchTodoById(id);
  } catch {
    redirect("/login?error=Session expired. Please login again.");
  }

  if (!todo) {
    notFound();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-2xl sm:p-8">
        <h1 className="text-xl font-semibold text-white">Edit Todo</h1>
        <p className="mt-1 text-sm text-zinc-400">Update your task title</p>

        <FlashMessage
          error={query.error}
          clearHref={`/dashboard/edit/${id}`}
        />

        <form action={updateTodoAction} className="mt-6 space-y-5">
          <input type="hidden" name="id" value={todo._id} />

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-zinc-300"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={todo.title}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/dashboard"
              className="rounded-xl border border-white/10 px-4 py-2.5 text-center text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
