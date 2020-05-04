const SET_VERSION = 'SET_VERSION';

export default function setVersion(version) {
  return {
    payload: { version },
    type: SET_VERSION
  };
}

export { SET_VERSION };
