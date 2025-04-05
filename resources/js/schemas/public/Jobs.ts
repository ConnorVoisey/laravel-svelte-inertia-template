// @generated
// This file is automatically generated by Kanel. Do not modify manually.

/** Indentifier type for jobs */
export type Id = number;

/** Represents the table public.jobs */
export default interface Jobs {
    id: Id;

    queue: string;

    payload: string;

    attempts: number;

    reserved_at: number | null;

    available_at: number;

    created_at: number;
}

/** Represents the initializer for the table public.jobs */
export interface JobsInitializer {
    /** Default value: nextval('jobs_id_seq'::regclass) */
    id?: Id;

    queue: string;

    payload: string;

    attempts: number;

    reserved_at?: number | null;

    available_at: number;

    created_at: number;
}

/** Represents the mutator for the table public.jobs */
export interface JobsMutator {
    id?: Id;

    queue?: string;

    payload?: string;

    attempts?: number;

    reserved_at?: number | null;

    available_at?: number;

    created_at?: number;
}
