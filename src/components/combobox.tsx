import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";

export default function SelectMenu({
  options,
}: {
  options: { id: any; name: string }[];
}) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selectedOption}
      onChange={setSelectedOption}
      onClose={() => setQuery("")}
    >
      <ComboboxInput
        aria-label="Assignee"
        className="input input-primary input-bordered min-w-96"
        value={query}
        placeholder="Select a station"
        displayValue={(option) => option.name}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ComboboxOptions
        anchor="bottom"
        className="border empty:invisible menu rounded-box mt-2 min-w-96"
      >
        {filteredOptions.map((option) => (
          <ComboboxOption
            key={option.id}
            value={option}
            className="data-[focus]:bg-neutral data-[focus]:text-neutral-content p-1 rounded-btn"
          >
            {option.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
