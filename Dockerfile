# syntax=docker/dockerfile:1

# Stage 1: Build frontend assets
FROM node:20-slim AS assets
WORKDIR /app
COPY package.json bun.lock* package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: PHP runtime
FROM php:8.2-cli
WORKDIR /var/www/html

# Install PHP extensions and tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    libicu-dev \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    git \
    && docker-php-ext-install -j$(nproc) pdo_pgsql pgsql mbstring bcmath zip opcache \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy application code
COPY . .

# Copy built frontend assets
COPY --from=assets /app/public/build /var/www/html/public/build

# Install PHP dependencies
RUN composer config --global policy.advisories.block false && \
    composer install --no-dev --no-interaction --optimize-autoloader

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
