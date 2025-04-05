import '../css/main.scss';

import type { ResolvedComponent } from '@inertiajs/svelte';
import { createInertiaApp } from '@inertiajs/svelte';
import createServer from '@inertiajs/svelte/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { defineRoutes } from 'momentum-trail';
import { render } from 'svelte/server';
import AuthenticatedLayout from './Layouts/AuthenticatedLayout.svelte';
import ErrorLayout from './Layouts/ErrorLayout.svelte';
import GuestLayout from './Layouts/GuestLayout.svelte';
import LoginLayout from './Layouts/LoginLayout.svelte';
import routes from './routes.json';

defineRoutes(routes);
const layoutMap = {
    'Auth/Login': LoginLayout,
    'Auth/Register': LoginLayout,
    'Auth/ForgotPassword': LoginLayout,
    'Auth/ResetPassword': LoginLayout,
    Welcome: GuestLayout,
    Error: ErrorLayout,
};

export const resolve = async (name: string) => {
    const page = await resolvePageComponent(
        `./Pages/${name}.svelte`,
        import.meta.glob<ResolvedComponent>('./Pages/**/*.svelte'),
    );
    const layout = layoutMap[name as keyof typeof layoutMap] ?? AuthenticatedLayout;
    // const layout = null;
    console.log({ page, name, layout });
    return {
        default: page.default,
        layout: page.layout || layout,
    };
};
// createServer(async (page) => {
//     const res = await resolve(page.component);
//
//     const resRendered = render(res.default);
//     // return {
//     //     head: [resRendered.head],
//     //     body: resRendered.body,
//     // }
//     const comp = res.layout;
//     console.log({ page, res, comp });
//
//     const layoutRes = await resolvePageComponent(
//         `./Layouts/TestLayout.svelte`,
//         import.meta.glob<ResolvedComponent>('./Layouts/**/*.svelte'),
//     );
//     const layout = layoutRes.default;
//     console.log({ layoutRes, layout });
//
//     // console.log(layout({ $$props: { children: page } }));
//
//     // const res2 = render(layout);
//     const res2 = render((first, second) => {
//         console.log({first, second});
//         return layout(first, { children: res.default });
//     });
//     // render((val) => console.log({ val, uidRes: val.uid((valUid) => console.log({ valUid })) }));
//     console.log({ res2 });
//     return {
//         head: [res2.head],
//         body: res2.body,
//     };
//     return {
//         head: ['Head'],
//         body: 'Body',
//     }
// }
//     // createInertiaApp({
//     //     resolve,
//     //     page,
//     //     progress: {
//     //         color: 'hsl(var(--clr-primary-5))',
//     //         showSpinner: true,
//     //     },
//     // }),
// );
// async function createInertiaApp({
//   id = 'app',
//   resolve,
//   setup,
//   progress = {},
//   page,
// }: CreateInertiaAppProps): InertiaAppResponse {
//   const isServer = typeof window === 'undefined'
//   const el = isServer ? null : document.getElementById(id)
//   const initialPage: Page = page || JSON.parse(el?.dataset.page || '{}')
//   const resolveComponent = (name: string) => Promise.resolve(resolve(name))
//
//   const [initialComponent] = await Promise.all([
//     resolveComponent(initialPage.component),
//   ])
//
//   const props: InertiaAppProps = { initialPage, initialComponent, resolveComponent }
//
//   const svelteApp = setup({
//     el,
//     App: App as unknown as AppComponent,
//     props
//   })
//
//   if (isServer) {
//     const { html, head, css } = svelteApp as SvelteRenderResult
//
//     return {
//       body: `<div data-server-rendered="true" id="${id}" data-page="${escape(JSON.stringify(initialPage))}">${html}</div>`,
//       head: [head, css ? `<style data-vite-css>${css.code}</style>` : ''],
//     }
//   }
//
//   if (progress) {
//     setupProgress(progress)
//   }
// }

createServer((page) =>
    createInertiaApp({
        page,
        resolve,
        setup({ App, props }) {
            return render(App, { props });
        },
    }),
);
