#!/bin/sh

yarn ts-node -e 'require("./src/frameworks/database/knex/knex-migration.framework.ts").createDatabase()'
yarn migration:latest
