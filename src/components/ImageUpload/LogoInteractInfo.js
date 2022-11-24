import styled from '@emotion/styled';

export const LogoInteractInfo = ({ inputRef, onChange }) => {
  return (
    <Wrapper>
      <b>Imagem</b>

      <span aria-label='Inserir imagem'>
        Solte a imagem aqui ou clique para alterar.
      </span>

      <input
        ref={inputRef}
        type='file'
        accept='image/png, image/jpeg, image/jpg'
        onChange={onChange}
        name='coverImage'
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
