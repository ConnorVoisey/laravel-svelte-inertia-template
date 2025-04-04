import { p as push, g as bind_props, b as pop, c as copy_payload, a as assign_payload, s as store_get, i as store_mutate, f as attr, u as unsubscribe_stores } from "../ssr.js";
import "@inertiajs/core";
import { u as useForm } from "./useForm-vfoFFG2R.js";
/* empty css                                             */
import { I as Input } from "./Input-C68CY8ZQ.js";
import { route } from "momentum-trail";
import "@inertiajs/core/server";
import "uuidv7";
import "@formkit/auto-animate";
function Modal($$payload, $$props) {
  push();
  let {
    showModal = void 0,
    header,
    children,
    footer
  } = $$props;
  $$payload.out += `<dialog class="svelte-1iz8a6c"><div class="svelte-1iz8a6c">`;
  if (header) {
    $$payload.out += "<!--[-->";
    header($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  children($$payload);
  $$payload.out += `<!----> `;
  if (footer) {
    $$payload.out += "<!--[-->";
    footer($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<hr> <button autofocus class="btn-secondary-sink">Close</button>`;
  }
  $$payload.out += `<!--]--></div></dialog>`;
  bind_props($$props, { showModal });
  pop();
}
function DeleteUserForm($$payload, $$props) {
  push();
  var $$store_subs;
  let confirmingUserDeletion = false;
  let passwordInput;
  const form = useForm({ password: "" });
  function closeModal() {
    confirmingUserDeletion = false;
    store_get($$store_subs ?? ($$store_subs = {}), "$form", form).reset();
  }
  function deleteUser() {
    store_get($$store_subs ?? ($$store_subs = {}), "$form", form).delete(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput == null ? void 0 : passwordInput.focus(),
      onFinish: () => store_get($$store_subs ?? ($$store_subs = {}), "$form", form).reset()
    });
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<section class="space-y-6"><header><h2 class="subtitle">Delete Account</h2> <p>Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
            your account, please download any data or information that you wish to retain.</p></header> <button class="btn-primary">Delete Account</button> `;
    Modal($$payload2, {
      show: confirmingUserDeletion,
      onclose: closeModal,
      children: ($$payload3) => {
        $$payload3.out += `<div class="flex flex-col gap-4 p-4"><h2 class="subtitle">Are you sure you want to delete your account?</h2> <p>Once your account is deleted, all of its resources and data will be permanently deleted. Please enter
                your password to confirm you would like to permanently delete your account.</p> `;
        Input($$payload3, {
          label: "Password",
          type: "password",
          placeholder: "Password",
          onkeyup: (e) => e.key === "Enter" && deleteUser(),
          error: store_get($$store_subs ?? ($$store_subs = {}), "$form", form).errors.password,
          get value() {
            return store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password;
          },
          set value($$value) {
            store_mutate($$store_subs ?? ($$store_subs = {}), "$form", form, store_get($$store_subs ?? ($$store_subs = {}), "$form", form).password = $$value);
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> <div class="flex justify-end gap-4"><button class="btn">Cancel</button> <button class="btn-primary"${attr("disabled", store_get($$store_subs ?? ($$store_subs = {}), "$form", form).processing, true)}>Delete Account</button></div></div>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></section>`;
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
  DeleteUserForm as default
};
