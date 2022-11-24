import styled from '@emotion/styled';

export const LogoInteractInfo = ({ inputRef, onChange }) => {
  return (
    <Wrapper>
      <b>Avatar</b>

      <span aria-label='Inserir imagem'>
        Solte a imagem aqui ou clique para alterar.
      </span>

      <input
        ref={inputRef}
        type='file'
        accept='image/png, image/jpeg, image/jpg'
        onChange={onChange}
        name='avatar'
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
