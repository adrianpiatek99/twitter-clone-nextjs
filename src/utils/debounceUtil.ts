export const debounce = <T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number
) => {
  let timeout: NodeJS.Timeout | undefined;

  return (...args: T): Promise<U> => {
    clearTimeout(timeout);

    return new Promise(resolve => {
      timeout = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
};
