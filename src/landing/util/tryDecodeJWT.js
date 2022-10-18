import decode from 'jwt-decode';

export default function tryDecodeJWT(token) {
  try {
    return token && decode(token);
  } catch (error) {}
}
