import styled from "styled-components";
import { link, transition } from "./helpers";
import Link from "next/link";

const activeClassName = "active";

const LinkWrapper = styled.a.attrs({ activeClassName })`
  ${link};

  position: relative;
  border: none;
  background-color: transparent;

  ::after {
    ${transition("opacity")};

    content: "";
    position: absolute;
    opacity: 0;
  }

  &.${activeClassName} {
    background-color: var(--color-activeBackground);

    ::after {
      opacity: 1;
    }
  }
`;

const NavLink = ({
  className,
  href,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => unknown;
}) => {
  if (!href) {
    return (
      <LinkWrapper as="button" className={className} onClick={onClick}>
        {children}
      </LinkWrapper>
    );
  }
  return (
    <Link href={href} passHref={true}>
      <LinkWrapper className={className}>{children}</LinkWrapper>
    </Link>
  );
};

export default NavLink;
