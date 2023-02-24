import { useEffect } from 'react';
import { useState } from 'react';
import noImage from '../../assets/images/no-image.png';

function Image({ src, alt, className, fallbackImg = noImage, ...props }) {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(fallbackImg);
        console.log(fallback);
    };

    useEffect(() => {
        // setFallback('');
    }, [src]);

    return <img src={fallback || src} alt={alt} className={className} onError={handleError} {...props} />;
}

export default Image;
