// Load the env vars into the process in env. This might be a part of node in the latest version so you might be able to replace this with the --env-file flag
require('dotenv').config();
const { join } = require('path');
const { recase } = require('@kristiandupont/recase');
const { tryParse } = require('tagged-comment-parser');

const { generateIndexFile } = require('kanel');

const toPascalCase = recase('snake', 'pascal');

/** @type {import('kanel').Config} */
module.exports = {
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },

    preDeleteOutputFolder: true,
    outputPath: './resources/js/schemas',
    //   TODO: add this to fix the primaru keys not being numbers
    generateIdentifierType: (column, details) => {
        const name = toPascalCase(column.name);
        return {
            declarationType: 'typeDeclaration',
            name,
            exportAs: 'named',
            typeDefinition: [`number`],
            comment: [`Indentifier type for ${details.name}`],
        };
    },
    //   generateIdentifierType: (column, details, config) => {
    //   const name = escapeIdentifier(
    //     toPascalCase(details.name) + toPascalCase(column.name)
    //   );
    //
    //   let innerType;
    //   if (column.type === 'serial' || column.type === 'bigserial') {
    //     innerType = 'number';
    //   } else {
    //     innerType = resolveType(column, details, config);
    //   }
    //
    //   const imports = [];
    //
    //   let type = innerType;
    //   if (typeof innerType === "object") {
    //     type = innerType.name;
    //     imports.push(...innerType.typeImports);
    //   }
    //
    //   return {
    //     declarationType: "typeDeclaration",
    //     name,
    //     exportAs: "named",
    //     typeDefinition: [`${type} & { __brand: '${escapeString(name)}' }`],
    //     typeImports: imports,
    //     comment: [`Identifier type for ${details.schemaName}.${details.name}`],
    //   };
    // },

    customTypeMap: {
        'pg_catalog.int64': 'number',
        'pg_catalog.tsvector': 'string',
        'pg_catalog.bpchar': 'string',
    },
};
