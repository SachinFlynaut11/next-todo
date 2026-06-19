import Link from "next/link";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteTodoAction } from "@/app/actions/todo";
import type { Todo } from "@/types/todo";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function TodoTable({ todos }: { todos: Todo[] }) {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-zinc-950/50">
              <th className="px-6 py-4 font-medium text-zinc-400">ID</th>
              <th className="px-6 py-4 font-medium text-zinc-400">Title</th>
              <th className="px-6 py-4 font-medium text-zinc-400">Date</th>
              <th className="px-6 py-4 text-right font-medium text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {todos.map((todo, index) => (
              <tr key={todo._id} className="transition hover:bg-white/2">
                <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-white">
                  {todo.title}
                </td>
                <td className="px-6 py-4 text-zinc-400">
                  {formatDate(todo.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/edit/${todo._id}`}
                      aria-label="Edit todo"
                      className="rounded-lg p-2 text-indigo-300 transition hover:bg-indigo-500/15 hover:text-indigo-200"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </Link>
                    <form action={deleteTodoAction}>
                      <input type="hidden" name="id" value={todo._id} />
                      <button
                        type="submit"
                        aria-label="Delete todo"
                        className="rounded-lg p-2 text-red-300 transition hover:bg-red-500/15 hover:text-red-200"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-white/5 md:hidden">
        {todos.map((todo, index) => (
          <div key={todo._id} className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-zinc-500">#{index + 1}</p>
                <p className="mt-1 font-medium wrap-break-word text-white">
                  {todo.title}
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  {formatDate(todo.createdAt)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Link
                  href={`/dashboard/edit/${todo._id}`}
                  aria-label="Edit todo"
                  className="rounded-lg p-2 text-indigo-300 transition hover:bg-indigo-500/15"
                >
                  <FiEdit2 className="h-4 w-4" />
                </Link>
                <form action={deleteTodoAction}>
                  <input type="hidden" name="id" value={todo._id} />
                  <button
                    type="submit"
                    aria-label="Delete todo"
                    className="rounded-lg p-2 text-red-300 transition hover:bg-red-500/15"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
