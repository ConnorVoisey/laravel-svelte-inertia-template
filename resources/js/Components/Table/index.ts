import type { Snippet } from 'svelte';

export type Column<T extends string = string, Row extends Record<string, any> = Record<string, any>> = {
    key: T;
    label: string;
    hidden?: boolean; // This allows a data column to exist that can be used inside the rendering function without having to render it
    cellRenderer: (row: Row) =>
        | ({ type: 'link'; href: string; highlightRowOnHover?: boolean; highlightError?: boolean } & (
              | {
                    text: string;
                }
              | {
                    snippet: Snippet<[Row]>;
                }
          ))
        | {
              type: 'custom';
              renderer: Snippet<[Column<T>, Row]>;
          };
};

export type Paginator = { limit: number; offset: number };
export type FetchRes<V extends Record<string, any> = Record<string, any>> = {
    rows: V[];
    count: number;
};

export type Fetcher<T extends string = string, Row extends Record<string, any> = Record<string, any>> = (input: {
    paginator: Paginator;
    columns: Column<T, Row>[];
}) => Promise<{ data: FetchRes<Row>; error: null } | { data: null; error: { message: string } }>;

export const refreshEveryOptions = [
    { label: 'Dont Refresh', value: null },
    { label: '5 secs', value: 1000 * 5 },
    { label: '15 secs', value: 1000 * 15 },
    { label: '1 min', value: 1000 * 60 },
    { label: '2 mins', value: 1000 * 60 * 2 },
    { label: '15 mins', value: 1000 * 60 * 15 },
    { label: '1 hour', value: 1000 * 60 * 60 },
] as const;
