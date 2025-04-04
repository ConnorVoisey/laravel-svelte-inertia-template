import { j as spread_attributes, p as push, d as escape_html, b as pop, s as store_get, k as page, c as copy_payload, a as assign_payload, u as unsubscribe_stores, h as head } from "../ssr.js";
import { route } from "momentum-trail";
import "@inertiajs/core";
/* empty css                                             */
import "@inertiajs/core/server";
function Link($$payload, $$props) {
  let {
    href,
    children,
    underlined = true,
    $$slots,
    $$events,
    ...attrs
  } = $$props;
  $$payload.out += `<!---->`;
  {
    $$payload.out += `<a${spread_attributes({ href, ...attrs }, null, { link: underlined })}>`;
    children($$payload);
    $$payload.out += `<!----></a>`;
  }
  $$payload.out += `<!---->`;
}
function Chevron_right($$payload, $$props) {
  const { $$slots, $$events, ...p } = $$props;
  $$payload.out += `<svg${spread_attributes(
    {
      viewBox: "0 0 24 24",
      width: "1.2em",
      height: "1.2em",
      ...p
    },
    null,
    void 0,
    void 0,
    3
  )}><path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"></path></svg>`;
}
function Breadcrumb($$payload, $$props) {
  push();
  let {
    project,
    server,
    service,
    disk,
    additionalText
  } = $$props;
  $$payload.out += `<div class="flex items-end text-2xl">`;
  if (project) {
    $$payload.out += "<!--[-->";
    Link($$payload, {
      href: route("projects.show", { project }),
      class: "flex items-center gap-2 text-on-surface-0",
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(project.name)}`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (server) {
    $$payload.out += "<!--[-->";
    Chevron_right($$payload, {});
    $$payload.out += `<!----> `;
    Link($$payload, {
      href: route("servers.show", { project, server }),
      class: "flex items-center gap-2  text-on-surface-0",
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(server.label)}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (service) {
    $$payload.out += "<!--[-->";
    Chevron_right($$payload, {});
    $$payload.out += `<!----> `;
    Link($$payload, {
      href: route("services.show", { project, server, service }),
      class: "flex items-center gap-2  text-on-surface-0",
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(service.name)}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (disk) {
    $$payload.out += "<!--[-->";
    Chevron_right($$payload, {});
    $$payload.out += `<!----> `;
    Link($$payload, {
      href: route("disks.show", { project, server, service, disk }),
      class: "flex items-center gap-2  text-on-surface-0",
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(disk.mounted)}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (additionalText) {
    $$payload.out += "<!--[-->";
    if (project != null) {
      $$payload.out += "<!--[-->";
      Chevron_right($$payload, {});
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> ${escape_html(additionalText)}`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Layout($$payload, $$props) {
  push();
  var $$store_subs;
  const { children, display_user } = $$props;
  let pageInfo = (() => {
    if (store_get($$store_subs ?? ($$store_subs = {}), "$page", page).component === "Users/Index") return { title: "List" };
    if (store_get($$store_subs ?? ($$store_subs = {}), "$page", page).component === "Users/Create") return { title: "Create", label: "Create User" };
    if (store_get($$store_subs ?? ($$store_subs = {}), "$page", page).component === "Users/Show") return { title: "Show" };
    if (store_get($$store_subs ?? ($$store_subs = {}), "$page", page).component === "Users/Edit") return { title: "Edit", label: "Edit" };
  })();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>${escape_html(pageInfo == null ? void 0 : pageInfo.title)}</title>`;
    });
    $$payload2.out += `<div class="content-width"><header class="my-8 flex flex-wrap items-center justify-between">`;
    Breadcrumb($$payload2, { additionalText: pageInfo == null ? void 0 : pageInfo.label });
    $$payload2.out += `<!----> <div class="flex flex-wrap gap-4">`;
    if (store_get($$store_subs ?? ($$store_subs = {}), "$page", page).component !== "Admin/Users/Index") {
      $$payload2.out += "<!--[-->";
      Link($$payload2, {
        href: route("users.index"),
        class: "btn",
        underlined: false,
        children: ($$payload3) => {
          $$payload3.out += `<!---->List`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (store_get($$store_subs ?? ($$store_subs = {}), "$page", page).component !== "Admin/Users/Create") {
      $$payload2.out += "<!--[-->";
      Link($$payload2, {
        href: route("users.create"),
        class: "btn",
        underlined: false,
        children: ($$payload3) => {
          $$payload3.out += `<!---->Create`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (display_user) {
      $$payload2.out += "<!--[-->";
      if (store_get($$store_subs ?? ($$store_subs = {}), "$page", page).component !== "Admin/Users/Show") {
        $$payload2.out += "<!--[-->";
        Link($$payload2, {
          href: route("users.show", { user: display_user }),
          class: "btn",
          underlined: false,
          children: ($$payload3) => {
            $$payload3.out += `<!---->Show`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (store_get($$store_subs ?? ($$store_subs = {}), "$page", page).component !== "Admin/Users/Edit") {
        $$payload2.out += "<!--[-->";
        Link($$payload2, {
          href: route("users.edit", { user: display_user }),
          class: "btn",
          underlined: false,
          children: ($$payload3) => {
            $$payload3.out += `<!---->Edit`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <button class="btn-error">Delete</button>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></header> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    children($$payload2);
    $$payload2.out += `<!----></div>`;
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
  Layout as default
};
