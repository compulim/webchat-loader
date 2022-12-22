import decode from 'jwt-decode';

export default function tryDecodeJWT<T = unknown>(token: string): T | undefined {
  try {
    return token ? decode(token) : undefined;
  } catch (error) {}
}
