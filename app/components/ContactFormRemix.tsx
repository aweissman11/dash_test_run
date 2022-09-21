import { Form, useTransition } from "@remix-run/react";
import * as gtag from "./utils/gtags.client";

import { Button } from "~/components/Button";

export type ContactFormProps = {
  className?: string;
  title: string;
};

export const ContactForm = ({ className = "", title }: ContactFormProps) => {
  const transition = useTransition();
  const inputClassName = "border border-border-weak p-2 my-2 w-full";
  return (
    <div className={`grid gap-10 p-4 lg:grid-cols-3 lg:p-10 ${className}`}>
      <div>
        <h1 className="text-4xl lg:text-5xl">{title}</h1>
      </div>
      <div className="lg:col-span-2">
        {/* TODO: Once Remix supports things inside Storybook better (https://github.com/remix-run/remix/discussions/2481), move this over to `ContactForm` and delete the generic component. */}
        <Form method="post">
          <fieldset className="grid gap-4 md:grid-cols-2">
            <p>
              <label>
                First name
                <br />
                <input
                  className={inputClassName}
                  name="firstName"
                  type="text"
                />
              </label>
            </p>
            <p>
              <label>
                Last name
                <br />
                <input className={inputClassName} name="lastName" type="text" />
              </label>
            </p>
            <p>
              <label>
                Email address
                <br />
                <input className={inputClassName} name="email" type="text" />
              </label>
            </p>
            <p>
              <label>
                Phone
                <br />
                <input className={inputClassName} name="phone" type="text" />
              </label>
            </p>
            <p>
              <label>
                How'd you hear about us?
                <br />
                <input className={inputClassName} name="source" type="text" />
              </label>
            </p>
            <p>
              <label>
                What can we do for you?
                <br />
                <input className={inputClassName} name="subject" type="text" />
              </label>
            </p>
          </fieldset>
          <p>
            <Button
              className="mt-6"
              type="submit"
              onClick={() =>
                // TODO: This should be refactored to account for error handling, but is a good example of how gtag.event() can be used.
                gtag.event({
                  action: "submit",
                  category: "contact",
                  label: "form",
                  value: "submit",
                })
              }
            >
              {transition.state === "submitting" ? "Submitting..." : "Submit"}
            </Button>
          </p>
        </Form>
      </div>
    </div>
  );
};
