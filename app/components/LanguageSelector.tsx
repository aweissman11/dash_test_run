import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { GlobeIcon } from "@heroicons/react/outline";
import { Button } from "./Button";

import { supportedLanguages } from "~/i18n-config";
import { parseDomain, fromUrl, ParseResultType } from "parse-domain";
import { useTranslation } from "react-i18next";

const languages = supportedLanguages;

/**
 * This component initially renders a button that opens a modal when clicked.
 * When the modal is open, it renders a list of languages that comes from
 * `supportedLanguages` in the i18n configuration file.
 */
export function LanguageSelector() {
  const { i18n, t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    languages.find((l) => l.code === i18n.language) || languages[0]
  );

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const closeAndSelectLanguage = (language: string) => {
    /**
     * Note: currently we trigger a language change by redirecting to a subdomain
     * with the language code. We'll want to support other ways, but this is a
     * simple way to get the language change to work for now.
     * @see https://github.com/sergiodxa/remix-i18next
     * Eventually, we can use `i18n.changeLanguage(language);`
     */
    const [subdomainToRedirectTo] = language.split("-", 1);
    // redirect to the subdomain with the language code
    const parsedResult = parseDomain(fromUrl(window.location.href));

    if (parsedResult.type === ParseResultType.Listed) {
      /**
       * This should always be true, but just in case.
       * Assumptions: this site is not hosted on a subdomain.
       * If it is, you'll need to refactor this.
       */
      const { domain, topLevelDomains } = parsedResult;
      window.location.host = `${subdomainToRedirectTo}.${domain}.${topLevelDomains.join(
        "."
      )}`;
    } else if (parsedResult.type === ParseResultType.Reserved) {
      // this should always be true, but just in case
      const { hostname } = parsedResult;
      const hostnames = hostname.split(".");
      const root = hostnames[hostnames.length - 1];
      window.location.host = `${subdomainToRedirectTo}.${root}`;
    }

    closeModal();
  };

  return (
    <>
      <div>
        <Button
          variant="tertiary"
          onClick={openModal}
          className="m-4 rounded-full"
          ariaLabel="Language Selector"
          icon={<GlobeIcon className="m-1 h-6 w-6 text-grey-dark-2" />}
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3">{t("Change Language")}</Dialog.Title>
                  <div className="mt-4">
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-sm border bg-white py-2 pl-3 pr-10 text-left outline outline-1 outline-black focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          <span className="block truncate">
                            {selected.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <SelectorIcon
                              className="h-5 w-5 text-grey-dark-1"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="z-11 absolute mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {languages.map((language, i) => (
                              <Listbox.Option
                                key={i}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-primary-50 text-primary"
                                      : "text-text-black"
                                  }`
                                }
                                value={language}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {language.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-weak">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="primary"
                      className="py-3 px-4"
                      onClick={() => closeAndSelectLanguage(selected.code)}
                    >
                      {t("Okay")}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
