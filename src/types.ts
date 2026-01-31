// 정제된 database type
import { type Database } from "@/database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
