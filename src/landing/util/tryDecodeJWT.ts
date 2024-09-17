import { jwtDecode } from 'jwt-decode';

export default function tryDecodeJWT<T = unknown>(token: string): Readonly<T> | undefined {
  try {
    return token ? Object.freeze(jwtDecode<T>(token)) : undefined;
  } catch (error) {}
}
