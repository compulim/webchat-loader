import isLocalhost from "./isLocalhost";

test('passing "localhost" should return true', () => {
  expect(isLocalhost('localhost')).toBe(true);
});

test('passing "localhost:5000" should return true', () => {
  expect(isLocalhost('localhost:5000')).toBe(true);
});

test('passing "mybox.localhost" should return true', () => {
  expect(isLocalhost('mybox.localhost')).toBe(true);
});

test('passing "mybox.localhost:5000" should return true', () => {
  expect(isLocalhost('mybox.localhost:5000')).toBe(true);
});

test('passing "bing.com" should return false', () => {
  expect(isLocalhost('bing.com')).toBe(false);
});

test('passing "localhost.bing.com" should return false', () => {
  expect(isLocalhost('localhost.bing.com')).toBe(false);
});

test('passing "MYBOX.LOCALHOST:5000" should return true', () => {
  expect(isLocalhost('MYBOX.LOCALHOST:5000')).toBe(true);
});

test('passing "127.0.0.1" should return true', () => {
  expect(isLocalhost('127.0.0.1')).toBe(true);
});

test('passing "127.0.0.1:5000" should return true', () => {
  expect(isLocalhost('127.0.0.1:5000')).toBe(true);
});

test('passing "::1" should return true', () => {
  expect(isLocalhost('::1')).toBe(true);
});

test('passing "::1:5000" should return true', () => {
  expect(isLocalhost('::1:5000')).toBe(true);
});
