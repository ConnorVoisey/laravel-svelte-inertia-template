import { p as push, h as head, G as GuestLayout, b as pop, l as attr_class, f as attr, n as clsx, s as store_get, u as unsubscribe_stores } from "../ssr.js";
import "@inertiajs/core";
import { u as useForm } from "./useForm-vfoFFG2R.js";
import "momentum-trail";
import "@inertiajs/core/server";
function VerifyEmail($$payload, $$props) {
  push();
  var $$store_subs;
  let { status } = $$props;
  let verificationLinkSent = status === "verification-link-sent";
  const form = useForm({});
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Email Verification</title>`;
  });
  GuestLayout($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<div class="text-gray-600 dark:text-gray-400 mb-4 text-sm">Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we
        just emailed to you? If you didn't receive the email, we will gladly send you another.</div> `;
      if (verificationLinkSent) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="text-green-600 dark:text-green-400 mb-4 text-sm font-medium">A new verification link has been sent to the email address you provided during registration.</div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <form><div class="mt-4 flex items-center justify-between"><button${attr_class(clsx(store_get($$store_subs ?? ($$store_subs = {}), "$form", form).processing && "opacity-25"))}${attr("disabled", store_get($$store_subs ?? ($$store_subs = {}), "$form", form).processing, true)}>Resend Verification Email</button> <button class="text-gray-600 hover:text-gray-900 focus:ring-indigo-500 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800 rounded-md text-sm underline focus:outline-none focus:ring-2 focus:ring-offset-2">Log Out</button></div></form>`;
    },
    $$slots: { default: true }
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  VerifyEmail as default
};
