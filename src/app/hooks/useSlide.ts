
'use client';
import { useEffect, useState } from 'react';
import useGraphql from './useGraphql';

interface Slide {
    type: string;
    src: string;
    name: string;
}


export const useSlide = () => {
    const apiPhotos = useGraphql();
    const [loading, setLoading] = useState(true);
    const [data , setData] = useState<Slide[]>([]);
    apiPhotos.then((data) => {
        setLoading(false);
        setData(data);
    });

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!loading) {
                setIndex((p) => (p + 1) % data?.length);
            }
        }, 7000);
        return () => clearInterval(timer);
    }, [data, loading]);
    return { loading, slide: loading ? null : data[index] };
};
export default useSlide;
