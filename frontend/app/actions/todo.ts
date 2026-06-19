"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from "@/lib/api-server";

export async function createTodoAction(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();

  if (!title) {
    redirect("/dashboard?error=Title is required");
  }

  try {
    await createTodoApi(title);
  } catch {
    redirect("/dashboard?error=Failed to create todo");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard?success=Todo created successfully");
}

export async function updateTodoAction(formData: FormData) {
  const id = formData.get("id") as string;
  const title = (formData.get("title") as string)?.trim();

  if (!title) {
    redirect(`/dashboard/edit/${id}?error=Title is required`);
  }

  try {
    await updateTodoApi(id, title);
  } catch {
    redirect(`/dashboard/edit/${id}?error=Failed to update todo`);
  }

  revalidatePath("/dashboard");
  redirect("/dashboard?success=Todo updated successfully");
}

export async function deleteTodoAction(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    await deleteTodoApi(id);
  } catch {
    redirect("/dashboard?error=Failed to delete todo");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard?success=Todo deleted successfully");
}
