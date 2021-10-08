import React from "react";
import styled from "styled-components";
import SelectWrapper from "../shared/form/SelectWrapper";
import { config } from "../../lib/config";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes.utils";

const Dropdown = styled.select`
  border: none;
  border-radius: 0;
  width: 100%;
  padding: 8px 16px;
  background-color: var(--color-foreground);
  font-size: 15px;
  color: var(--color-normalText);
  appearance: none;
`;

const CategoryMenuDropdown = ({ category }: { category: string }) => {
  const router = useRouter();
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    const url =
      newCategory === "all" ? ROUTES.HOME() : ROUTES.CATEGORY(newCategory);
    router.push(url);
  };

  return (
    <SelectWrapper flex>
      <Dropdown value={category} onChange={handleOnChange}>
        {["all", ...config.categories].map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </Dropdown>
    </SelectWrapper>
  );
};

export default CategoryMenuDropdown;
