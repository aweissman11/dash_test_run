import { useState } from "react";

export type SizeSelectorProps = {
  options: { name: string; size: string; disabled?: boolean }[];
};

export function SizeSelector({ options }: SizeSelectorProps) {
  const [selected, setSelected] = useState("small");

  return (
    <div className="flex flex-row justify-start">
      {options.map(({ name, size, disabled }) => (
        <label
          title={name}
          key={name}
          className={`mx-2 transition-all ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <div
            className={`bg-transparent p-[3px] ${
              !disabled
                ? size === selected
                  ? "outline outline-2 outline-black"
                  : "hover:outline hover:outline-2 hover:outline-border"
                : ""
            }`}
          >
            <div
              className={`align-center flex h-[30px] w-[30px] flex-col justify-center bg-black text-center text-[14px] text-white ${
                disabled ? "bg-background text-grey-dark-1" : ""
              }`}
            >
              {size}
            </div>
          </div>

          <input
            className="hidden"
            type="radio"
            name="size"
            value={size}
            checked={selected === size}
            onChange={(e) => setSelected(e.target.value)}
          />
        </label>
      ))}
    </div>
  );
}
