import Button from "./shared/Button";
import styled from "styled-components";
import { IoEllipse as NewIcon, IoFlame as FireIcon } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useCurrentCategory } from "../lib/hooks";
import { PostSort } from "../graphql/generated/types";

const FilterWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--color-foreground);
  justify-content: space-between;
  align-items: center;
`;

const FilterSelectButton = styled(Button)<{ active?: boolean }>`
  margin-right: 1rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-foreground);
  color: var(--color-mutedText);
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  min-width: 7rem;

  ${(p) =>
    p.active &&
    `
    color: var(--color-blue);
  `}
`;

const FilterLabel = styled.span`
  padding-left: 0.8rem;
`;

const ListHeader = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  margin-left: 1.7rem;
  text-transform: lowercase;
`;

type Props = {
  header?: string;
  defaultSort: PostSort;
  onChange: (sort: PostSort) => void;
};
export const ListFilter = ({
  defaultSort = PostSort.Recent,
  ...props
}: Props) => {
  const category = useCurrentCategory();
  const [selectedFilter, setSelectedFilter] = useState(defaultSort);
  const header = props.header || `/a/${category || "all"}`;

  useEffect(() => {
    props.onChange && props.onChange(selectedFilter);
  }, [selectedFilter]);

  return (
    <FilterWrapper>
      <ListHeader>{header}</ListHeader>
      <div style={{ display: "flex" }}>
        <FilterSelectButton
          active={selectedFilter === PostSort.Recent}
          onClick={() => setSelectedFilter(PostSort.Recent)}
        >
          <NewIcon
            size={15}
            title={"Newest first"}
            color={selectedFilter === PostSort.Recent ? "orange" : ""}
          />
          <FilterLabel>New</FilterLabel>
        </FilterSelectButton>
        <FilterSelectButton
          active={selectedFilter === PostSort.Popular}
          onClick={() => setSelectedFilter(PostSort.Popular)}
        >
          <FireIcon
            size={15}
            title={"Popular"}
            color={selectedFilter === PostSort.Popular ? "red" : ""}
          />
          <FilterLabel>Hot</FilterLabel>
        </FilterSelectButton>
      </div>
    </FilterWrapper>
  );
};

export default ListFilter;
