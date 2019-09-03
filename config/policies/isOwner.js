'use strict';

/**
 * `isOwner` policy.
 */

module.exports = async (ctx, next) => {
  // Add your own logic here.
  console.log('In isOwner policy.');

  await next();
};
