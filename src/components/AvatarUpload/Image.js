import { useEffect, useState } from 'react';

import { Warning as WarningIcon } from '@mui/icons-material';

import styled from '@emotion/styled';

export const Image = ({ error, file, imgRef, defaultURL = '', ...props }) => {
  const [memoizedURL, setMemoizedURL] = useState(defaultURL);

  useEffect(() => {
    if (file) {
      setMemoizedURL(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <Wrapper {...props}>
      <StyledImage
        error={error}
        url={memoizedURL}
        ref={imgRef}
        aria-label='Image'
      >
        {error && <WarningIcon />}
      </StyledImage>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 113px;
  height: 113px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-right: 32px;
`;

const StyledImage = styled.div`
  background-color: #c3cbd5;
  width: 113px;
  height: 113px;
  border-radius: 50%;

  ${({ url }) =>
    url
      ? `
          background: ${`url(${url})`};
        `
      : ''}

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
