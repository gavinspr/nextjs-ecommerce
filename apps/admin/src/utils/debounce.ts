type DebounceFn<T extends unknown[]> = {
  (...args: T): void;
  cancel: () => void;
};

export function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number
): DebounceFn<T> {
  let timeoutId: NodeJS.Timeout | null = null;

  const debounced = ((...args: T) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  }) as DebounceFn<T>;

  debounced.cancel = () => {
    if (timeoutId) clearTimeout(timeoutId);
  };

  return debounced;
}