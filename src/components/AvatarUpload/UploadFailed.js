import { Close as CloseIcon } from '@mui/icons-material';

import styled from '@emotion/styled';

import { Image } from './Image';

export const UploadFailed = ({ reset }) => (
  <div className='content-wrapper'>
    <Image error />

    <TextWrapper>
      <UploadFailedTitle>Desculpe, o upload falhou.</UploadFailedTitle>
      <TryAgain aria-label='Tentar de novo' onClick={reset}>
        Tentar de novo
      </TryAgain>
    </TextWrapper>

    <IconWrapper>
      <CloseIcon onClick={reset} />
    </IconWrapper>
  </div>
);

const UploadFailedTitle = styled.span`
  font-weight: 400;
  color: #c64d32;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 0;
`;

const TryAgain = styled.a`
  color: #3d485f;
  margin-top: 10px;
  font-weight: 500;
  text-decoration-line: underline;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  div {
    height: 15px;
  }

  img {
    cursor: pointer;
  }
`;
