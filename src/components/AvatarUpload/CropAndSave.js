import { useEffect, useRef } from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { Slider } from '@mui/material';

import styled from '@emotion/styled';

import { Button } from './Button';
import { Image } from './Image';

export const CropAndSave = ({
  zoomLevel,
  isErrored,
  imageFile,
  setIsSaved,
  handleSliderChange,
  reset,
}) => {
  const imgRef = useRef(null);

  const setZoom = zoom => {
    imgRef.current?.style.setProperty(
      'transform',
      `scale(${zoom > 1 ? 1 + zoom / 10 : 1})`
    );
  };

  useEffect(() => {
    setZoom(zoomLevel);
  }, [zoomLevel]);

  const handleSaveButtonClick = () => setIsSaved(true);

  return (
    <div className='content-wrapper'>
      <Image error={isErrored} file={imageFile} imgRef={imgRef} />

      <CropArea>
        <CropTitle>Cortar</CropTitle>
        <Slider
          value={zoomLevel}
          onChange={handleSliderChange}
          min={1}
          max={10}
          aria-label='Slider'
        />
        <SaveButtonWrapper>
          <Button onClick={handleSaveButtonClick}>Salvar</Button>
        </SaveButtonWrapper>
      </CropArea>

      <IconArea>
        <CloseIcon onClick={reset} />
      </IconArea>
    </div>
  );
};

const CropArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CropTitle = styled.span`
  color: #677489;
`;

const SaveButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 32px;
`;

const IconArea = styled.div`
  margin-left: 60px;
  display: flex;
  flex-shrink: 0;
  div {
    height: 15px;
  }
  img {
    cursor: pointer;
  }
`;
