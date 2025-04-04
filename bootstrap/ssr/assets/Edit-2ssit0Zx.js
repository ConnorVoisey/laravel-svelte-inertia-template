import { p as push, c as copy_payload, a as assign_payload, b as pop, h as head, s as store_get, u as unsubscribe_stores } from "../ssr.js";
import { route } from "momentum-trail";
import UpdateForm from "./UpdateForm-DWq6haHx.js";
import "@inertiajs/core";
import { u as useForm } from "./useForm-vfoFFG2R.js";
import Layout from "./Layout-CGT1_H_8.js";
import "@inertiajs/core/server";
import "./Input-C68CY8ZQ.js";
import "uuidv7";
import "@formkit/auto-animate";
/* empty css                                             */
function Edit($$payload, $$props) {
  push();
  var $$store_subs;
  let { display_user, projects } = $$props;
  let form = useForm({
    name: display_user.name,
    email: display_user.email
  });
  function onsubmit(e) {
    e.preventDefault();
    store_get($$store_subs ?? ($$store_subs = {}), "$form", form).put(route("users.update", { user: display_user }));
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>User</title>`;
    });
    Layout($$payload2, {
      display_user,
      children: ($$payload3) => {
        UpdateForm($$payload3, {
          onsubmit,
          get form() {
            return form;
          },
          set form($$value) {
            form = $$value;
            $$settled = false;
          }
        });
      }
    });
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
  Edit as default
};
