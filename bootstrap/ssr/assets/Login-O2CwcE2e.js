import { p as push, j as spread_attributes, d as escape_html, g as bind_props, b as pop, c as copy_payload, a as assign_payload, h as head, s as store_get, i as store_mutate, f as attr, l as attr_class, m as stringify, u as unsubscribe_stores } from "../ssr.js";
import { uuidv7 } from "uuidv7";
import { I as Input } from "./Input-C68CY8ZQ.js";
import "@inertiajs/core";
import { u as useForm } from "./useForm-vfoFFG2R.js";
import { route } from "momentum-trail";
import "@inertiajs/core/server";
import "@formkit/auto-animate";
function Checkbox($$payload, $$props) {
  push();
  let {
    id = uuidv7(),
    label,
    checked = false,
    error,
    $$slots,
    $$events,
    ...attrs
  } = $$props;
  $$payload.out += `<label class="flex max-w-max cursor-pointer flex-col"><div class="space-between flex items-center gap-2"><input${spread_attributes(
    {
      class: "checkbox",
      id,
      ...attrs,
      type: "checkbox",
      checked
    },
    "svelte-myl326"
  )}> `;
  if (label) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="label">${escape_html(label)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  if (error) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="error-text">${escape_html(error)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></label>`;
  bind_props($$props, { checked });
  pop();
}
function Login($$payload, $$props) {
  push();
  var $$store_subs;
  let { canResetPassword, status } = $$props;
  const form = useForm({ email: "", password: "", remember: false });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Log in</title>`;
    });
    if (status) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="mb-4 text-sm font-medium text-success-5">${escape_html(status)}</div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <form class="flex flex-col gap-4"><h1 class="title">Login</h1> `;
    Input($$payload2, {
      type: "email",
      required: true,
      autofocus: true,
      autocomplete: "username",
      label: "Email",
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
      id: "password",
      type: "password",
      required: true,
      autocomplete: "current-password",
      error: store_get($$store_subs ?? ($$store_subs = {}), "$form", form).errors.password,
      get value() {
        return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password;
      },
      set value($$value) {
        store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password = $$value);
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="flex flex-wrap justify-between gap-8">`;
    Checkbox($$payload2, {
      label: "Remember me",
      get checked() {
        return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).remember;
      },
      set checked($$value) {
        store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).remember = $$value);
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (canResetPassword) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<a${attr("href", route("password.request"))} class="link">Forgot your password?</a>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> <button${attr_class(`btn-primary ${stringify(store_get($$store_subs ?? ($$store_subs = {}), "$form", form).processing && "opacity-25")}`)}${attr("disabled", store_get($$store_subs ?? ($$store_subs = {}), "$form", form).processing, true)}>Log in</button></form>`;
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
  Login as default
};
