# Тестовое задание
Веб-сервис отображающий на карте Google последние твиты

## Требования
- php 7.1
- composer 1.4
- mysql 5.7

## Установка
После клонирования проекта, перейдите в папку самого проекта и обновите composer с помощью команды:
```
composer update --no-scripts
```

Затем, создайте копию файла `.env.example` и переименуйте его в `.env`. Пример:
```
cp .env.example .env
```

Внутри `.env` нужно указать конфигурации базы данных и Twitter API. Создайте отдельную базу для данного проекта и укажите его название вместо `НАЗВАНИЕ_БД`.
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=НАЗВАНИЕ_БД
DB_USERNAME=ИМЯ_ПОЛЬЗОВАТЕЛЯ
DB_PASSWORD=ПАРОЛЬ

TWITTER_CONSUMER_KEY=ВАШ_CONSUMER_KEY
TWITTER_CONSUMER_SECRET=ВАШ_CONSUMER_SECRET
TWITTER_ACCESS_TOKEN=ВАШ_ACCESS_TOKEN
TWITTER_ACCESS_TOKEN_SECRET=ВАШ_ACCESS_TOKEN_SECRET
```

После этого запустите следующие команды:
```
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Последняя команда запустит проект на локальном хосте и его можно будет увидеть по адресу `127.0.0.1:8000`
