import { useProductOptions } from "@shopify/hydrogen";
import type { ProductOption } from "@shopify/hydrogen/dist/esnext/storefront-api-types";

/**
 * A client component that tracks a selected variant and/or selling plan state, as well as callbacks for modifying the state
 */
export default function ProductOptions() {
  const { options, setSelectedOption, selectedOptions } = useProductOptions();

  // Cast to ProductOption to avoid type errors
  const productOptions: ProductOption[] =
    options?.map((option) => ({
      ...(option as ProductOption),
    })) || [];

  return (
    <>
      {productOptions.map(({ name, values }) => {
        return (
          <fieldset key={name} className="my-8">
            <legend className="mb-2 text-sm font-medium text-black">
              <span className="font-bold">{name}: </span>
              {selectedOptions ? selectedOptions[name] : ""}
            </legend>
            <div className="flex flex-wrap items-center gap-4">
              {values.map((value: string) => {
                const checked = selectedOptions
                  ? selectedOptions[name] === value
                  : false;
                const id = `option-${name}-${value}`;

                return (
                  <label key={id} htmlFor={id}>
                    <input
                      className="sr-only"
                      type="radio"
                      id={id}
                      name={`option[${name}]`}
                      value={value}
                      checked={checked}
                      onChange={() => setSelectedOption(name, value)}
                    />
                    <div
                      className={`${checked ? "border-2 border-black" : ""}`}
                    >
                      <div
                        className={`m-1 cursor-pointer border border-black p-2 text-xs font-light ${
                          checked ? "bg-black text-white" : "text-black"
                        }`}
                      >
                        {value}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </>
  );
}
