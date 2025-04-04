import { p as push, c as copy_payload, a as assign_payload, g as bind_props, b as pop, s as store_get, i as store_mutate, f as attr, u as unsubscribe_stores } from "../ssr.js";
import { I as Input } from "./Input-C68CY8ZQ.js";
import "@inertiajs/core";
import "@inertiajs/core/server";
import "momentum-trail";
import "uuidv7";
import "@formkit/auto-animate";
function UpdateForm($$payload, $$props) {
  push();
  var $$store_subs;
  let { form = void 0, onsubmit } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<section><form class="card space-y-4"><legend class="subtitle">Details</legend> `;
    Input($$payload2, {
      label: "Name",
      error: store_get($$store_subs ?? ($$store_subs = {}), "$form", form).errors.name,
      type: "text",
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
      error: store_get($$store_subs ?? ($$store_subs = {}), "$form", form).errors.email,
      type: "email",
      get value() {
        return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).email;
      },
      set value($$value) {
        store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).email = $$value);
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="flex items-center gap-4"><button${attr("disabled", store_get($$store_subs ?? ($$store_subs = {}), "$form", form).processing, true)} class="btn-primary">Save</button></div></form></section>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { form });
  pop();
}
export {
  UpdateForm as default
};
