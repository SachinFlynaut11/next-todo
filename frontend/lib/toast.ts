import toast from "react-hot-toast";

export function getErrorMessage(
  err: unknown,
  fallback = "Something went wrong. Please try again."
) {
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message: string }).message);
  }
  return fallback;
}

export const showSuccess = (message: string) => toast.success(message);

export const showError = (message: string) => toast.error(message);

export const showLoading = (message: string) => toast.loading(message);

export const dismissToast = (toastId: string) => toast.dismiss(toastId);
