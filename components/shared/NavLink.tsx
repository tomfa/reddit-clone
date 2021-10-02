import styled from "styled-components";
import { link, transition } from "./helpers";
import Link from "next/link";

const activeClassName = "active";

const LinkWrapper = styled.a.attrs({ activeClassName })`
  ${link};

  position: relative;

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
}: {
  className?: string;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} passHref={true}>
      <LinkWrapper className={className}>{children}</LinkWrapper>
    </Link>
  );
};

export default NavLink;
