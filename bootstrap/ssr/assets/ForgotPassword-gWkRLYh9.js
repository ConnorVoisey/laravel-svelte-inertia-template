import { p as push, c as copy_payload, a as assign_payload, b as pop, h as head, d as escape_html, s as store_get, i as store_mutate, f as attr, u as unsubscribe_stores } from "../ssr.js";
import "@formkit/auto-animate";
import { I as Input } from "./Input-C68CY8ZQ.js";
import "momentum-trail";
import "@inertiajs/core";
import { u as useForm } from "./useForm-vfoFFG2R.js";
import "@inertiajs/core/server";
import "uuidv7";
function ForgotPassword($$payload, $$props) {
  push();
  var $$store_subs;
  let { status } = $$props;
  const form = useForm({ email: "" });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Forgot Password</title>`;
    });
    $$payload2.out += `<form class="flex flex-col gap-4"><h1 class="title">Forgot Password</h1> <p class="text-sm text-on-surface-0">Forgot your password? No problem. Just let us know your email address and we will email you a password reset
        link that will allow you to choose a new one.</p> `;
    if (status) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="text-sm font-medium text-success-5">${escape_html(status)}</div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div>`;
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
    $$payload2.out += `<!----></div> <button class="btn-primary"${attr("disabled", store_get($$store_subs ?? ($$store_subs = {}), "$form", form).processing, true)}>Email Password Reset Link</button></form>`;
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
  ForgotPassword as default
};
