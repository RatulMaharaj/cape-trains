import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

export default function DropdownMenu({
  options,
  placeholder,
  onChange,
}: {
  options: { id: number; name: string }[];
  placeholder?: string;
  onChange?: (value: { id: number; name: string }) => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(options[1]);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selected}
      onChange={(value) => {
        if (value) {
          setSelected(value);
          if (onChange) {
            onChange(value);
          }
        }
      }}
      onClose={() => setQuery("")}
    >
      <div className="relative">
        <ComboboxInput
          className={clsx("input input-bordered")}
          displayValue={(option: { id: number; name: string }) => option?.name}
          placeholder={placeholder ?? "Select an option"}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="size-4 fill-base-content/60 group-data-[hover]:fill-base-content" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--input-width)] rounded-box border border-white/5 bg-base-200 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {filteredOptions.map((option) => (
          <ComboboxOption
            key={option.id}
            value={option}
            className="group flex cursor-default items-center gap-2 rounded-box py-1.5 px-3 select-none data-[focus]:bg-base-300"
          >
            <CheckIcon className="invisible size-4 fill-accent group-data-[selected]:visible" />
            <div className="text-sm">{option.name}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
