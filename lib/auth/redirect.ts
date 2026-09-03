/**
 * Returns an internal path only. Keeping this in one place prevents auth flows
 * from turning an untrusted `next` query parameter into an open redirect.
 */
export function getSafeInternalPath(
  candidate: string | null | undefined,
  fallback = "/"
): string {
  if (!candidate || !candidate.startsWith("/")) return fallback;

  try {
    const base = new URL("https://internal.invalid");
    const destination = new URL(candidate, base);

    if (destination.origin !== base.origin) return fallback;

    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return fallback;
  }
}

export function getSafePostAuthPath(
  candidate: string | null | undefined,
  fallback = "/"
): string {
  const path = getSafeInternalPath(candidate, fallback);

  // Prevent successful authentication from looping back to an auth screen.
  if (path === "/login" || path === "/signup" || path.startsWith("/auth/")) {
    return fallback;
  }

  return path;
}
