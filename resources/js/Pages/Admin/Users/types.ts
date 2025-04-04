import type { InertiaForm } from '@inertiajs/svelte';
import type { Writable } from 'svelte/store';

export type UserFormInner = {
    name: string;
    email: string;
};
export type UsersForm = Writable<InertiaForm<UserFormInner>>;
