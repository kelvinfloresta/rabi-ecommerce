#!/bin/sh
export NODE_PATH="."
export NODE_ENV=$1

yarn ts-node -e 'require("./src/frameworks/database/knex/knex-migration.framework.ts").rebuildDatabase()'
yarn migration:latest
