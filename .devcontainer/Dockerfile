FROM mcr.microsoft.com/devcontainers/php:8.2

# Install Node.js, npm, Composer, Vite and PHP PostgreSQL extension
RUN apt-get update \
    && apt-get install -y libpq-dev nodejs npm unzip postgresql-client docker.io \
    && docker-php-ext-install pdo pdo_pgsql \
    && npm install -g vite

# Add composer bin directory to PATH
ENV PATH="/root/.composer/vendor/bin:$PATH"

# Working directory
ARG WORKSPACE_FOLDER
WORKDIR ${WORKSPACE_FOLDER}

RUN chmod +x /workspaces/todo/.devcontainer/init.sh || true