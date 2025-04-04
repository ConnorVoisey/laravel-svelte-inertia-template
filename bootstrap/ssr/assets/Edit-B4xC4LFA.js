import { h as head } from "../ssr.js";
import DeleteUserForm from "./DeleteUserForm-C85pn5JJ.js";
import UpdatePasswordForm from "./UpdatePasswordForm-_MjItyhg.js";
import UpdateProfileInformationForm from "./UpdateProfileInformationForm-CnZuFsPC.js";
import "@inertiajs/core";
import "@inertiajs/core/server";
import "momentum-trail";
import "./useForm-vfoFFG2R.js";
/* empty css                                             */
import "./Input-C68CY8ZQ.js";
import "uuidv7";
import "@formkit/auto-animate";
import "./Transition-Cgn2ELi9.js";
function Edit($$payload, $$props) {
  let { mustVerifyEmail, status } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Profile</title>`;
  });
  $$payload.out += `<div class="my-8"><div class="content-width flex flex-col gap-8"><h1 class="title">Profile</h1> <div class="card">`;
  UpdateProfileInformationForm($$payload, { mustVerifyEmail, status });
  $$payload.out += `<!----></div> <div class="card">`;
  UpdatePasswordForm($$payload);
  $$payload.out += `<!----></div> <div class="card">`;
  DeleteUserForm($$payload);
  $$payload.out += `<!----></div></div></div>`;
}
export {
  Edit as default
};
