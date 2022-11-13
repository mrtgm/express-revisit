import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

type MyLinkProps = {
  href: string;
  children: React.ReactNode;
} & LinkProps;

export function MyLink({ href, children, ...props }: MyLinkProps) {
  return (
    <NextLink href={href} legacyBehavior passHref>
      <Link {...props}>{children}</Link>
    </NextLink>
  );
}
