import NextLink from 'next/link';
import styled from 'styled-components';

export const Link = styled(NextLink)`
  color: ${({ theme }) => theme.colors.textLink};
`;
