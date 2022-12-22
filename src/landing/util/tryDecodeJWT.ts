import decode from 'jwt-decode';

export default function tryDecodeJWT<T = unknown>(token: string): Readonly<T> | undefined {
  try {
    return token ? Object.freeze(decode<T>(token)) : undefined;
  } catch (error) {}
}
