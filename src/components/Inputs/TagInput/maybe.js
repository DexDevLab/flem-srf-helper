export function maybeCall(maybeFunc, ...args) {
  if (typeof maybeFunc === "function") {
    return maybeFunc(...args);
  } else {
    return maybeFunc;
  }
}
