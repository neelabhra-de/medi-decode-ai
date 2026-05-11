import { useEffect, useState } from "react";

export default function useMockFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetcher().then((res) => mounted && setData(res)).catch((e) => mounted && setError(e)).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [fetcher]);

  return { data, loading, error };
}
