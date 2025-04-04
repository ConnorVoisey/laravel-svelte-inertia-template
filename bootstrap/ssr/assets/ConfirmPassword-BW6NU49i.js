import { p as push, c as copy_payload, a as assign_payload, b as pop, h as head, s as store_get, i as store_mutate, f as attr, u as unsubscribe_stores } from "../ssr.js";
import { I as Input } from "./Input-C68CY8ZQ.js";
import "momentum-trail";
import "@inertiajs/core";
import { u as useForm } from "./useForm-vfoFFG2R.js";
import "@inertiajs/core/server";
import "uuidv7";
import "@formkit/auto-animate";
function ConfirmPassword($$payload, $$props) {
  push();
  var $$store_subs;
  const form = useForm({ password: "" });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Confirm Password</title>`;
    });
    $$payload2.out += `<div class="mb-4 text-sm">This is a secure area of the application. Please confirm your password before continuing.</div> <form><div>`;
    Input($$payload2, {
      label: "Password",
      type: "password",
      required: true,
      autocomplete: "current-password",
      autofocus: true,
      error: store_get($$store_subs ?? ($$store_subs = {}), "$form", form).errors.password,
      get value() {
        return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password;
      },
      set value($$value) {
        store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password = $$value);
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="mt-4 flex justify-end"><button class="btn-primary"${attr("disabled", store_get($$store_subs ?? ($$store_subs = {}), "$form", form).processing, true)}>Confirm</button></div></form>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  ConfirmPassword as default
};
