import React, { useRef, useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import styled from '@emotion/styled';

import { CropAndSave } from './CropAndSave';
import { LogoInteractInfo } from './LogoInteractInfo';
import { SavedImage } from './SavedImage';
import { UploadFailed } from './UploadFailed';

export const AvatarUpload = ({ defaultURL = '' }) => {
  const [imageFile, setImageFile] = useState(null);
  const [isErrored, setError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const inputRef = useRef(null);

  const { register } = useFormContext();

  const { ref, onChange } = register('avatar');

  const handleRef = useCallback(
    event => {
      ref(event);
      inputRef.current = event;
    },
    [ref]
  );

  const onClickContainer = () => {
    inputRef.current?.click();
  };

  const isFileValid = file => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!file) return false;

    return validTypes.includes(file.type);
  };

  const updateStatesOnChange = file => {
    if (file && isFileValid(file)) {
      setImageFile(file);
      setIsSaved(false);
      setZoomLevel(1);
    }

    setError(!isFileValid(file));
  };

  const fileDrop = event => {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    updateStatesOnChange(file);
  };

  const onChangeFile = event => {
    onChange(event);

    const selectedFile = event.target.files[0];

    updateStatesOnChange(selectedFile);
  };

  const handleSliderChange = (event, value) => {
    setZoomLevel(value);
  };

  const reset = () => {
    setImageFile(null);
    setZoomLevel(1);
    setError(false);
    setIsSaved(false);
  };

  const dragOver = event => {
    event.preventDefault();
  };

  const dragEnter = event => {
    event.preventDefault();
  };

  const dragLeave = event => {
    event.preventDefault();
  };

  const renderChild = () => {
    if (isErrored) {
      return <UploadFailed reset={reset} />;
    }

    if (!isErrored && !imageFile && defaultURL === '') {
      return <LogoInteractInfo inputRef={handleRef} onChange={onChangeFile} />;
    }

    if (!isErrored && imageFile && !isSaved) {
      return (
        <CropAndSave
          handleSliderChange={handleSliderChange}
          imageFile={imageFile}
          isErrored={isErrored}
          reset={reset}
          zoomLevel={zoomLevel}
          setIsSaved={setIsSaved}
        />
      );
    }

    return (
      <SavedImage
        imageFile={imageFile}
        zoomLevel={zoomLevel}
        inputRef={handleRef}
        onChange={onChangeFile}
        defaultURL={defaultURL}
      />
    );
  };

  return (
    <Wrapper
      image={imageFile}
      isErrored={isErrored}
      isSaved={isSaved}
      onClick={onClickContainer}
      onDrop={fileDrop}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      {renderChild()}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 32px;
  background: #f2f5f8;
  width: 553px;
  height: 177px;

  ${({ isSaved, image, isErrored }) => `
    ${
      !image || isSaved
        ? `
            border: 2px dashed #c7cdd3;
          `
        : ''
    }
    ${
      (!image && !isErrored) || isSaved
        ? `
            cursor: pointer;
          `
        : ''
    }
  `}

  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  input {
    display: none;
  }

  .content-wrapper {
    width: 100%;
    display: flex;
  }
`;
