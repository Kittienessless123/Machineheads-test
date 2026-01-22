import $api from "../http/api";
import type { AxiosResponse } from "axios";
import type { AuthResponse } from "../../types/index.ts";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("auth/login", { email, password });
  }


}