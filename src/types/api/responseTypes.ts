import type { user } from "../index.ts";

export interface AuthResponse {
  refreshToken: string;
  accessToken: string;
  user: user;
 }
