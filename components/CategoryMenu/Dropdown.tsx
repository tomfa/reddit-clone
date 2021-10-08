import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import SelectWrapper from "../shared/form/SelectWrapper";
import { config } from "../../lib/config";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes.utils";

const DropdownElement = styled.select`
  border: none;
  border-radius: 0;
  width: 100%;
  padding: 8px 16px;
  background-color: var(--color-foreground);
  font-size: 15px;
  color: var(--color-text);
  appearance: none;
`;

function Dropdown<T = string>({
  value,
  options,
  onValueChange,
  className,
}: {
  value: T;
  options: Array<{ value: T; label: string }>;
  onValueChange: (value: T) => void;
  className?: string;
}) {
  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    []
  );
  const [selectedStringValue, setSelectedStringValue] = useState(
    selectedOption?.label
  );
  useEffect(() => {
    setSelectedStringValue(selectedOption?.label);
  }, [selectedOption]);
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newOptionSelected = options.find(
        (o) => o.label === event.target.value
      );
      if (!newOptionSelected) {
        return;
      }
      setSelectedStringValue(newOptionSelected.label);
      onValueChange(newOptionSelected.value);
    },
    [onValueChange]
  );
  return (
    <SelectWrapper flex>
      <DropdownElement
        value={selectedStringValue}
        onChange={onChange}
        className={className}
      >
        {options.map(({ value, label }) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </DropdownElement>
    </SelectWrapper>
  );
}

export default Dropdown;
