import { p as push, c as copy_payload, a as assign_payload, b as pop, s as store_get, i as store_mutate, f as attr, u as unsubscribe_stores } from "../ssr.js";
import "@inertiajs/core";
import { u as useForm } from "./useForm-vfoFFG2R.js";
import { I as Input } from "./Input-C68CY8ZQ.js";
import { T as Transition } from "./Transition-Cgn2ELi9.js";
import "momentum-trail";
import "@inertiajs/core/server";
import "uuidv7";
import "@formkit/auto-animate";
function UpdatePasswordForm($$payload, $$props) {
  push();
  var $$store_subs;
  const form = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<form class="flex flex-col gap-4"><header><h2 class="subtitle">Update Password</h2> <p>Ensure your account is using a long, random password to stay secure.</p></header> `;
    Input($$payload2, {
      label: "Current Password",
      type: "password",
      autocomplete: "current-password",
      error: store_get($$store_subs ?? ($$store_subs = {}), "$form", form).errors.current_password,
      get value() {
        return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).current_password;
      },
      set value($$value) {
        store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).current_password = $$value);
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Input($$payload2, {
      label: "New Password",
      type: "password",
      autocomplete: "new-password",
      error: store_get($$store_subs ?? ($$store_subs = {}), "$form", form).errors.password,
      get value() {
        return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password;
      },
      set value($$value) {
        store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password = $$value);
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Input($$payload2, {
      label: "Confirm Password",
      type: "password",
      autocomplete: "new-password",
      error: store_get($$store_subs ?? ($$store_subs = {}), "$form", form).errors.password_confirmation,
      get value() {
        return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password_confirmation;
      },
      set value($$value) {
        store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password_confirmation = $$value);
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="flex items-center gap-4"><button${attr("disabled", store_get($$store_subs ?? ($$store_subs = {}), "$form", form).processing, true)} class="btn-primary">Save</button> `;
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
  UpdatePasswordForm as default
};
