import { p as push, c as copy_payload, a as assign_payload, b as pop, h as head, s as store_get, i as store_mutate, f as attr, u as unsubscribe_stores } from "../ssr.js";
import "@inertiajs/core";
import { u as useForm } from "./useForm-vfoFFG2R.js";
import { I as Input } from "./Input-C68CY8ZQ.js";
import "momentum-trail";
import "@inertiajs/core/server";
import "uuidv7";
import "@formkit/auto-animate";
function ResetPassword($$payload, $$props) {
  push();
  var $$store_subs;
  let { email, token } = $$props;
  const form = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Reset Password</title>`;
    });
    $$payload2.out += `<form class="space-y-4"><legend class="title">Reset Password</legend> `;
    Input($$payload2, {
      label: "Email",
      type: "email",
      required: true,
      autofocus: true,
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
    Input($$payload2, {
      label: "Password",
      type: "password",
      required: true,
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
      required: true,
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
    $$payload2.out += `<!----> <button class="btn-primary"${attr("disabled", store_get($$store_subs ?? ($$store_subs = {}), "$form", form).processing, true)}>Reset Password</button></form>`;
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
  ResetPassword as default
};
