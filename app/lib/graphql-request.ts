/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 16 2021
 * @ Time: 21:44
 */

import { GraphQLClient } from 'graphql-request';

import { getSdk } from '~/generated';

const strapiClient = new GraphQLClient(process.env.STRAPI_API || '');

const api = getSdk(strapiClient);

export default api;
