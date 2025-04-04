import { p as push, s as store_get, k as page, c as copy_payload, a as assign_payload, u as unsubscribe_stores, b as pop, i as store_mutate, f as attr } from "../ssr.js";
import "@inertiajs/core";
import { u as useForm } from "./useForm-vfoFFG2R.js";
import { I as Input } from "./Input-C68CY8ZQ.js";
import { T as Transition } from "./Transition-Cgn2ELi9.js";
import "momentum-trail";
import "@inertiajs/core/server";
import "uuidv7";
import "@formkit/auto-animate";
function UpdateProfileInformationForm($$payload, $$props) {
  push();
  var $$store_subs;
  let { mustVerifyEmail, status } = $$props;
  const user = store_get($$store_subs ?? ($$store_subs = {}), "$page", page).props.auth.user;
  const form = useForm({ name: user.name, email: user.email });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<form class="flex flex-col gap-4"><header><h2 class="subtitle">Profile Information</h2> <p>Update your account's profile information and email address.</p></header> `;
    Input($$payload2, {
      label: "Name",
      type: "text",
      required: true,
      autofocus: true,
      autocomplete: "name",
      error: store_get($$store_subs ?? ($$store_subs = {}), "$form", form).errors.name,
      get value() {
        return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).name;
      },
      set value($$value) {
        store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).name = $$value);
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Input($$payload2, {
      label: "Email",
      type: "email",
      required: true,
      autocomplete: "username",
      error: store_get($$store_subs ?? ($$store_subs = {}), "$form", form).errors.email,
      get value() {
        return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).email;
      },
      set value($$value) {
        store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).email = $$value);
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (mustVerifyEmail && user.email_verified_at === null) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<p class="text-gray-800 dark:text-gray-200 mt-2 text-sm">Your email address is unverified. <button class="btn-primary">Click here to re-send the verification email.</button></p> `;
      if (status === "verification-link-sent") {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="text-green-600 dark:text-green-400 mt-2 text-sm font-medium">A new verification link has been sent to your email address.</div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div class="flex items-center gap-4"><button${attr("disabled", store_get($$store_subs ?? ($$store_subs = {}), "$form", form).processing, true)} class="btn-primary">Save</button> `;
    Transition($$payload2, {
      show: store_get($$store_subs ?? ($$store_subs = {}), "$form", form).recentlySuccessful,
      enter: "transition ease-in-out",
      enterFrom: "opacity-0",
      leave: "transition ease-in-out",
      leaveFrom: "opacity-0",
      children: ($$payload3) => {
        $$payload3.out += `<p class="text-success-5 transition ease-in-out">Saved.</p>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div></form>`;
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
  UpdateProfileInformationForm as default
};
