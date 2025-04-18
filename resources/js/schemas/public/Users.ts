// @generated
// This file is automatically generated by Kanel. Do not modify manually.

/** Indentifier type for users */
export type Id = number;

/** Represents the table public.users */
export default interface Users {
    id: Id;

    name: string;

    email: string;

    email_verified_at: Date | null;

    password: string;

    remember_token: string | null;

    created_at: Date | null;

    updated_at: Date | null;
}

/** Represents the initializer for the table public.users */
export interface UsersInitializer {
    /** Default value: nextval('users_id_seq'::regclass) */
    id?: Id;

    name: string;

    email: string;

    email_verified_at?: Date | null;

    password: string;

    remember_token?: string | null;

    created_at?: Date | null;

    updated_at?: Date | null;
}

/** Represents the mutator for the table public.users */
export interface UsersMutator {
    id?: Id;

    name?: string;

    email?: string;

    email_verified_at?: Date | null;

    password?: string;

    remember_token?: string | null;

    created_at?: Date | null;

    updated_at?: Date | null;
}
