import Button from "./shared/Button";
import styled from "styled-components";
import { IoEllipse as NewIcon, IoFlame as FireIcon } from "react-icons/io5";
import { useEffect, useState } from "react";
import { PostSort, QueryPostsArgs } from "../graphql/generated/types";
import Dropdown from "./CategoryMenu/Dropdown";
import { EMPTY_TIME_FILTER, getTimeFilterOptions } from "../utils/post.utils";

const FilterWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  padding: 1rem 0.5rem;
  background-color: var(--color-foreground);
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 768px) {
    padding: 1rem;
  }
`;

const FilterSelectButton = styled(Button)<{ active?: boolean }>`
  margin-right: 0.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-foreground);
  color: var(--color-mutedText);
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.8rem;
  min-width: 4rem;
  font-size: 0.8rem;

  @media only screen and (min-width: 768px) {
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    font-size: 1rem;
    min-width: 6rem;
  }

  ${(p) =>
    p.active &&
    `
    color: var(--color-blue);
  `}
`;

const FilterLabel = styled.span`
  padding-left: 0.8rem;
`;

const TimeDropdown = styled(Dropdown)`
  border: 1px solid var(--color-border);
  background-color: var(--color-foreground);
  color: var(--color-mutedText);
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
  min-width: 7rem;

  @media only screen and (min-width: 768px) {
    min-width: 8rem;
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
`;

const ListHeader = styled.h1`
  display: none;
  font-size: 1rem;
  margin: 0;
  text-transform: lowercase;

  @media only screen and (min-width: 769px) {
    display: block;
    font-size: 1.5rem;
    margin-left: 1.7rem;
  }
`;

type Props = {
  header?: string;
  hideFilters?: boolean;
  defaultSort?: PostSort;
  onChange?: (
    filter: Pick<QueryPostsArgs, "year" | "month" | "week" | "sort">
  ) => void;
};
export const ListFilter = ({
  defaultSort = PostSort.Recent,
  header,
  onChange,
  hideFilters,
}: Props) => {
  const timeOptions = getTimeFilterOptions();
  const [sort, setSort] = useState(defaultSort);
  const [timeFilter, setTimeFilter] = useState(timeOptions[0]?.value);
  useEffect(() => {
    if (!onChange) {
      return;
    }
    if (sort === PostSort.Recent) {
      return onChange({ sort, ...EMPTY_TIME_FILTER });
    }
    onChange({ sort, ...timeFilter });
  }, [sort, timeFilter]);

  const displayTimeSelection = sort === PostSort.Popular;

  return (
    <FilterWrapper>
      {header && <ListHeader>{header}</ListHeader>}
      {!hideFilters && (
        <div style={{ display: "flex" }}>
          <FilterSelectButton
            active={sort === PostSort.Recent}
            onClick={() => setSort(PostSort.Recent)}
          >
            <NewIcon
              size={15}
              title={"Newest first"}
              color={sort === PostSort.Recent ? "orange" : ""}
            />
            <FilterLabel>New</FilterLabel>
          </FilterSelectButton>
          <FilterSelectButton
            active={sort === PostSort.Popular}
            onClick={() => setSort(PostSort.Popular)}
          >
            <FireIcon
              size={15}
              title={"Popular"}
              color={sort === PostSort.Popular ? "red" : ""}
            />
            <FilterLabel>Hot</FilterLabel>
          </FilterSelectButton>
          {displayTimeSelection && (
            <TimeDropdown
              value={timeFilter}
              options={timeOptions}
              /* @ts-ignore because styled components generics is ugly */
              onValueChange={setTimeFilter}
            />
          )}
        </div>
      )}
    </FilterWrapper>
  );
};

export default ListFilter;
