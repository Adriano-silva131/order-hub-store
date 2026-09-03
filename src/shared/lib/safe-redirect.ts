export function isSafeRedirectPath(path: string | undefined): path is string {
  return Boolean(path) && path!.startsWith("/") && !path!.startsWith("//") && !path!.startsWith("/\\");
}
