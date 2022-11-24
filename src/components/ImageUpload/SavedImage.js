import { useEffect, useRef } from 'react';

import { Image } from './Image';
import { LogoInteractInfo } from './LogoInteractInfo';

export const SavedImage = ({
  imageFile,
  zoomLevel,
  inputRef,
  onChange,
  defaultURL,
}) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.style.setProperty(
        'transform',
        `scale(${1 + zoomLevel / 10})`
      );
    }
  }, [imgRef, zoomLevel]);

  return (
    <div className='content-wrapper'>
      <Image file={imageFile} imgRef={imgRef} defaultURL={defaultURL} />
      <LogoInteractInfo inputRef={inputRef} onChange={onChange} />
    </div>
  );
};
