import supabase from "@/lib/supabase.ts";
import { getRandomNickname } from "@/lib/utils.ts";

export async function fetchProfile(useId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", useId)
    .single();

  if (error) throw error;
  return data;
}

export async function createProfile(userId: string) {
  const { data, error } = await supabase.from("profile").insert({
    id: userId,
    nickname: getRandomNickname()
  }).select().single();

  if (error) throw error;
  return data;
}