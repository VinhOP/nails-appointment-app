import { useState } from 'react';
import noImage from '../../assets/images/no-image.png';

function Image({ src, alt, className, fallbackImg = noImage, ...props }) {
    const [fallback, setFallback] = useState(fallbackImg);

    const handleError = () => {
        setFallback(fallbackImg);
    };

    return <img src={src || fallback} alt={alt} className={className} onError={handleError} {...props} />;
}

export default Image;
