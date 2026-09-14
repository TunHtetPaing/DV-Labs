export function safeNextPath(
  value: string | null | undefined,
  fallback = "/",
) {
  if (
    value &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\") &&
    !value.includes("?") &&
    !value.includes("#")
  ) {
    return value;
  }
  return fallback;
}
