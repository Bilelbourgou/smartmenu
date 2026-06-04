export function isSuperAdmin(email: string | undefined | null): boolean {
  if (!email) return false;
  const raw = process.env.SUPERADMIN_EMAIL ?? "";
  const allowed = raw.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  return allowed.includes(email.toLowerCase());
}
