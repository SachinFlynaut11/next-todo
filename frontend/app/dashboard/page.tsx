import { redirect } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import FlashMessage from "@/components/FlashMessage";
import TodoTable from "@/components/TodoTable";
import { logoutAction } from "@/app/actions/auth";
import { createTodoAction } from "@/app/actions/todo";
import { fetchTodos } from "@/lib/api-server";
import { getServerUser } from "@/lib/auth-server";
import type { Todo } from "@/types/todo";

type DashboardPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;
  const user = await getServerUser();

  let todos: Todo[] = [];
  try {
    todos = await fetchTodos();
  } catch {
    redirect("/login?error=Session expired. Please login again.");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.1),transparent_45%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              My Todos
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {user?.name
                ? `Welcome, ${user.name}`
                : "Manage and track your tasks"}
            </p>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-white/10"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>

        <FlashMessage
          error={params.error}
          success={params.success}
          clearHref="/dashboard"
        />

        <div className="mb-6 rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-semibold text-white">Create Todo</h2>
          <form action={createTodoAction} className="flex flex-col gap-3 sm:flex-row">
            <input
              name="title"
              type="text"
              required
              placeholder="Enter todo title"
              className="flex-1 rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="submit"
              className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Create
            </button>
          </form>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-zinc-400">No todos yet.</p>
              <p className="mt-2 text-sm text-zinc-500">
                Use the form above to create your first todo.
              </p>
            </div>
          ) : (
            <TodoTable todos={todos} />
          )}
        </div>
      </div>
    </main>
  );
}
