import React, { useMemo } from "react";
import styled from "styled-components";
import SelectWrapper from "../shared/form/SelectWrapper";
import { config } from "../../lib/config";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes.utils";
import Dropdown from "./Dropdown";

const CategoryMenuDropdown = ({ category }: { category: string }) => {
  const router = useRouter();
  const handleOnChange = (newCategory: string) => {
    const url =
      newCategory === "all" ? ROUTES.HOME() : ROUTES.CATEGORY(newCategory);
    router.push(url);
  };

  const options = useMemo(
    () =>
      ["all", ...config.categories].map((value) => ({ value, label: value })),
    [config.categories]
  );

  return (
    <Dropdown
      value={category}
      options={options}
      onValueChange={handleOnChange}
    />
  );
};

export default CategoryMenuDropdown;
