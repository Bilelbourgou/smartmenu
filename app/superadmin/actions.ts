"use server";

import { createAdminClient } from "@/lib/supabase/admin-client";
import { revalidatePath } from "next/cache";

/* ── Users ─────────────────────────────────── */

export async function deleteUserAction(userId: string): Promise<{ error?: string }> {
  try {
    const admin = createAdminClient();
    const { error } = await admin.auth.admin.deleteUser(userId);
    if (error) return { error: error.message };
    revalidatePath("/superadmin/users");
    return {};
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function updateUserAction(
  userId: string,
  data: { email?: string; password?: string }
): Promise<{ error?: string }> {
  try {
    const admin = createAdminClient();
    const payload: Record<string, string> = {};
    if (data.email) payload.email = data.email;
    if (data.password) payload.password = data.password;
    const { error } = await admin.auth.admin.updateUserById(userId, payload);
    if (error) return { error: error.message };
    revalidatePath("/superadmin/users");
    return {};
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function toggleBanUserAction(
  userId: string,
  ban: boolean
): Promise<{ error?: string }> {
  try {
    const admin = createAdminClient();
    const { error } = await admin.auth.admin.updateUserById(userId, {
      ban_duration: ban ? "87600h" : "none",
    });
    if (error) return { error: error.message };
    revalidatePath("/superadmin/users");
    return {};
  } catch (e: any) {
    return { error: e.message };
  }
}

/* ── Restaurants ────────────────────────────── */

export async function deleteRestaurantAction(restaurantId: string): Promise<{ error?: string }> {
  try {
    const admin = createAdminClient();
    await admin.from("items").delete().eq("restaurant_id", restaurantId);
    await admin.from("categories").delete().eq("restaurant_id", restaurantId);
    const { error } = await admin.from("restaurants").delete().eq("id", restaurantId);
    if (error) return { error: error.message };
    revalidatePath("/superadmin/restaurants");
    return {};
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function updateRestaurantAction(
  restaurantId: string,
  data: { name: string; description?: string | null }
): Promise<{ error?: string }> {
  try {
    const admin = createAdminClient();
    const { error } = await admin
      .from("restaurants")
      .update({ name: data.name.trim(), description: data.description ?? null })
      .eq("id", restaurantId);
    if (error) return { error: error.message };
    revalidatePath("/superadmin/restaurants");
    return {};
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function toggleRestaurantActiveAction(
  restaurantId: string,
  isActive: boolean
): Promise<{ error?: string }> {
  try {
    const admin = createAdminClient();
    const { error } = await admin
      .from("restaurants")
      .update({ is_active: isActive })
      .eq("id", restaurantId);
    if (error) return { error: error.message };
    revalidatePath("/superadmin/restaurants");
    return {};
  } catch (e: any) {
    return { error: e.message };
  }
}
