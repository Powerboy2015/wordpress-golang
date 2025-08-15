import { useEffect, useRef} from "react";

export function useScrollEnd(
    _run: () => Promise<void>,
    _pixelOffset:number = 150,
) {
    const loadingRef = useRef<boolean>(false);

    useEffect(() => {
        const handleScroll = async () => {
            const bottom = document.body.clientHeight - window.innerHeight;
            const scrollposition = Math.round(window.scrollY);

            if(bottom - scrollposition <= _pixelOffset && !loadingRef.current) {
                loadingRef.current = true;          // mark as loading
                try{
                    await _run();
                } finally {
                    loadingRef.current = false;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[_pixelOffset,_run])
}
