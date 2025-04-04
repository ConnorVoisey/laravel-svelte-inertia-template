import { p as push, h as head, b as pop, e as ensure_array_like, d as escape_html, f as attr } from "../ssr.js";
import "@inertiajs/core";
import { route } from "momentum-trail";
import Layout from "./Layout-CGT1_H_8.js";
import "@inertiajs/core/server";
/* empty css                                             */
function Index($$payload, $$props) {
  push();
  const { users } = $$props;
  console.log({ users });
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Users</title>`;
  });
  Layout($$payload, {
    children: ($$payload2) => {
      const each_array = ensure_array_like(users);
      $$payload2.out += `<div class="flex flex-col gap-8"><table><thead><tr><th>Email</th><th>Role</th><th>Name</th><th>Action</th></tr></thead><tbody><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let user = each_array[$$index];
        $$payload2.out += `<tr><td>${escape_html(user.email)}</td><td>${escape_html(user.role)}</td><td>${escape_html(user.name)}</td><td><a${attr("href", route("users.show", { user }))} class="link">Show</a></td></tr>`;
      }
      $$payload2.out += `<!--]--></tbody></table></div>`;
    }
  });
  pop();
}
export {
  Index as default
};
