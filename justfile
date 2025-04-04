list:
    @just --list

install:
    npm i
    composer install

install_ext_ubuntu:
    wget https://github.com/watchexec/watchexec/releases/download/v2.2.0/watchexec-2.2.0-aarch64-unknown-linux-gnu.deb
    sudo dpkg -i watchexec-2.2.0-x86_64-unknown-linux-gnu.deb
    sudo apt install -f jq

up:
    docker compose up -d
    npm i
    composer i
    php artisan migrate
    @just clear_cache
    npm run everything

build:
    npm run build
    php artisan optimize
    php artisan config:cache
    php artisan event:cache
    php artisan route:cache
    php artisan view:cache

clear_cache:
    php artisan optimize:clear
    php artisan config:clear
    php artisan event:clear
    php artisan route:clear
    php artisan view:clear

