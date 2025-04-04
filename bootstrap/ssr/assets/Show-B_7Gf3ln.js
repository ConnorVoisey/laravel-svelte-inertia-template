import { p as push, h as head, b as pop, d as escape_html } from "../ssr.js";
import Layout from "./Layout-CGT1_H_8.js";
import "@inertiajs/core";
import "@inertiajs/core/server";
import "momentum-trail";
/* empty css                                             */
function Show($$payload, $$props) {
  push();
  const { display_user } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Users</title>`;
  });
  Layout($$payload, {
    display_user,
    children: ($$payload2) => {
      $$payload2.out += `<div class="card flex flex-col gap-2"><h2 class="subtitle">Details</h2> <p>Name: ${escape_html(display_user.name)}</p> <p>Email: ${escape_html(display_user.email)}</p></div>`;
    }
  });
  pop();
}
export {
  Show as default
};
