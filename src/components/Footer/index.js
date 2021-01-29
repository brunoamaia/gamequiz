import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  align-items: center;
  background-color: #00000070;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.secondary};
  padding: 20px;
  display: flex;
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: inherit;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="https://www.alura.com.br/">
        <img src="https://www.alura.com.br/assets/img/alura-logo-white.1570550707.svg" alt="Logo Alura" />
      </a>
      <p>
        Orgulhosamente criado durante
        {' '}
        a
        {' '}
        <a href="https://www.alura.com.br/">
          <span>Imersão React da Alura</span>
        </a>
      </p>
    </FooterWrapper>
  );
}
