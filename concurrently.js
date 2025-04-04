import { concurrently } from 'concurrently';

const { result } = concurrently(
    [
        { command: 'npm run dev', name: 'vite', prefixColor: '#93c5fd' },
        { command: "watchexec -e .php -r 'php artisan horizon'", name: 'horizon', prefixColor: '#c4b5fd' },
        {
            command: "watchexec -e .php -r 'php artisan trail:generate'",
            name: 'momentum trail',
            prefixColor: '#c4b5fd',
        },
        { command: "watchexec -e .php -r 'npm run db:gen_types'", name: 'db gen types', prefixColor: '#c4b5fd' },
        { command: 'tail -f storage/logs/laravel.log | jq', raw: true }, //FIXME: This isn't being outputted, the raw doesn't seem to work

        {
            command: 'node scheduler.js',
            name: 'scheduler',
            prefixColor: '#fdba74',
        },
    ],
    {
        raw: true,
    },
);
