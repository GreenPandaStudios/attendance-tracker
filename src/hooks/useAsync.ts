import { useEffect, useState } from "react";

export function useAsync<T>(
  asyncFunc: () => Promise<T>,
  onSuccess?: (val: T) => void,
  onError?: (error: Error) => void
): [loaded: boolean, value: T | undefined] {
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState<T | undefined>(undefined);
  useEffect(() => {
    asyncFunc()
      .then((val) => {
        setLoaded(true);
        setValue(val);
        if (onSuccess !== undefined) {
          onSuccess(val);
        }
      })
      .catch((e: Error) => {
        if (onError !== undefined) {
          onError(e);
        }
      });
  }, []);

  return [loaded, value];
}
