/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 10 2021
 * @ Time: 02:51
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRAPI_API: string;
    }
  }
}

export {};
