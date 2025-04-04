import { exec } from 'child_process';
import { schedule } from 'node-cron';

const runScheduler = () =>
    exec('php artisan schedule:run --ansi', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log('ran scheduler');
        process.stdout.write(stdout);
        process.stderr.write(stderr);
    });

// run scheduler on startup
runScheduler();

schedule('* * * * *', () => {
    // run scheduler every minute
    runScheduler();
}).start();
