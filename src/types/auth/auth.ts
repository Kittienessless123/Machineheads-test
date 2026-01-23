// types/auth.ts
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  access_expired_at: number;
  refresh_expired_at: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}