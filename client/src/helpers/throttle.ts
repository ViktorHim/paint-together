export const throttle = (func: Function, limit: number): Function => {
  let inThrottle = false;
  return function (...args: any[]) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
