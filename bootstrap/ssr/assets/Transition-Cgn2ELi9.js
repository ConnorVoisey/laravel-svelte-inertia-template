import { p as push, o as fallback, q as getContext, w as writable, r as setContext, t as attr_style, v as slot, g as bind_props, b as pop } from "../ssr.js";
const key = {};
function classes(classes2) {
  return classes2 ? classes2.split(" ").filter((x) => x) : [];
}
function Transition($$payload, $$props) {
  push();
  let show = fallback($$props["show"], null);
  let appear = fallback($$props["appear"], false);
  let unmount = fallback($$props["unmount"], false);
  let enter = fallback($$props["enter"], "");
  let enterFrom = fallback($$props["enterFrom"], "");
  let enterTo = fallback($$props["enterTo"], "");
  let leave = fallback($$props["leave"], null);
  let leaveFrom = fallback($$props["leaveFrom"], null);
  let leaveTo = fallback($$props["leaveTo"], null);
  const parent = show === null ? getContext(key) : null;
  const { subscribe, set } = writable(show);
  const context = {
    appear: parent ? parent.appear : appear,
    count: 0,
    show: { subscribe },
    completed: () => {
    }
  };
  setContext(key, context);
  let display = show && !context.appear ? "contents" : "none";
  let mounted = !unmount || show === true;
  classes(enter);
  classes(enterFrom);
  classes(enterTo);
  classes(leave === null ? enter : leave);
  classes(leaveFrom === null ? enterTo : leaveFrom);
  classes(leaveTo === null ? enterFrom : leaveTo);
  $$payload.out += `<div${attr_style("", { display })}>`;
  if (mounted) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", {});
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, {
    show,
    appear,
    unmount,
    enter,
    enterFrom,
    enterTo,
    leave,
    leaveFrom,
    leaveTo
  });
  pop();
}
export {
  Transition as T
};
