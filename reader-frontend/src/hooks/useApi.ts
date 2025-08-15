import { useEffect, useRef, useState } from "react";

type Fetcher<T> = () => Promise<T | false>;

/**
 * Custom hook to standardize api requests and remove overhead in other components.
 * @param _fetcher any requests that fetches data
 * @returns data - which holds the response data
 * @returns loading - if the current request is still loading
 * @returns error - any errors that were found if the request failed.
 */
export function useApi<T>(_fetcher: Fetcher<T>): [T | null, boolean, string | null] {
    const [data,setData] = useState<T | null>(null);
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);

    // in order to prevent infinite reloads, we are only using a reference of the fetch.
    const fetcherRef = useRef(_fetcher);
    fetcherRef.current = _fetcher;


    useEffect(() =>{
        let cancelled = false;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try{
                const result = await fetcherRef.current();
                if (cancelled) return;

                if (result === false) {
                    setError("No data found");
                } else {
                    setData(result);
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                if (!cancelled) setError(err?.message || "Unkown error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();

        return () => {
            cancelled = true;
        };

    },[]);

    return [data,loading,error];
}