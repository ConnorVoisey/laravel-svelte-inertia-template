import { j as spread_attributes, p as push, f as attr, d as escape_html, g as bind_props, b as pop } from "../ssr.js";
import { uuidv7 } from "uuidv7";
import "@formkit/auto-animate";
function Asterisk($$payload, $$props) {
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
  )}><path fill="currentColor" d="M21 13h-6.6l4.7 4.7l-1.4 1.4l-4.7-4.7V21h-2v-6.7L6.3 19l-1.4-1.4L9.4 13H3v-2h6.6L4.9 6.3l1.4-1.4L11 9.6V3h2v6.4l4.6-4.6L19 6.3L14.3 11H21z"></path></svg>`;
}
function Input($$payload, $$props) {
  push();
  let {
    id = uuidv7(),
    name = id,
    label,
    value = void 0,
    error,
    description,
    $$slots,
    $$events,
    ...attrs
  } = $$props;
  function focus() {
  }
  $$payload.out += `<div class="flex flex-col gap-1">`;
  if (label) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<label${attr("for", id)} class="label flex items-start gap-1">${escape_html(label)} `;
    if (attrs.required) {
      $$payload.out += "<!--[-->";
      Asterisk($$payload, {
        color: "hsl(var(--clr-error-5))",
        width: "0.8rem",
        height: "0.8rem"
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></label>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <input${spread_attributes(
    {
      id,
      name,
      ...attrs,
      class: "rounded-md border-on-surface-2 bg-surface-0 shadow-sm focus:border-primary-5 focus:ring-primary-5",
      value
    },
    "svelte-gzwo81"
  )}> `;
  if (description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm">${escape_html(description)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (error) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="error-text">${escape_html(error)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { value, focus });
  pop();
}
export {
  Input as I
};
