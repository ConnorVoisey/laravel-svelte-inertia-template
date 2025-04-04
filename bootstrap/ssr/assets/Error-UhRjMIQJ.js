import { d as escape_html } from "../ssr.js";
import "@inertiajs/core";
import "@inertiajs/core/server";
import "momentum-trail";
function Error($$payload, $$props) {
  let { status } = $$props;
  const res = (statusCode) => {
    if (statusCode === 503) {
      return {
        title: "503: Service Unavailable",
        description: "Sorry, we are doing some maintenance. Please check back soon."
      };
    } else if (statusCode === 500) {
      return {
        title: "500: Server Error",
        description: "Whoops, something went wrong on our servers."
      };
    } else if (statusCode === 404) {
      return {
        title: "404: Page Not Found",
        description: "Sorry, the page you are looking for could not be found."
      };
    } else if (statusCode === 403) {
      return {
        title: "403: Forbidden",
        description: "Sorry, you are forbidden from accessing this page."
      };
    } else return null;
  };
  const statusRes = res(status);
  $$payload.out += `<div class="card-lg flex flex-col gap-4">`;
  if (statusRes === null) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h1 class="title">An Unknown error occured</h1>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<h1 class="title">${escape_html(statusRes.title)}</h1> <div><p>${escape_html(statusRes.description)}</p> <a href="/" class="link">Return Home</a></div>`;
  }
  $$payload.out += `<!--]--></div>`;
}
export {
  Error as default
};
