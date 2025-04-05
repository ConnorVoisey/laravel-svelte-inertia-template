// @generated
// This file is automatically generated by Kanel. Do not modify manually.

/** Indentifier type for password_reset_tokens */
export type Email = number;

/** Represents the table public.password_reset_tokens */
export default interface PasswordResetTokens {
    email: Email;

    token: string;

    created_at: Date | null;
}

/** Represents the initializer for the table public.password_reset_tokens */
export interface PasswordResetTokensInitializer {
    email: Email;

    token: string;

    created_at?: Date | null;
}

/** Represents the mutator for the table public.password_reset_tokens */
export interface PasswordResetTokensMutator {
    email?: Email;

    token?: string;

    created_at?: Date | null;
}
