"use strict";

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const _ = require("lodash");

module.exports = {
  /**
   * Update authenticated user.
   *
   * @return {Object|Array}
   */

  me: async ctx => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] }
      ]);
    }

    const newEmail = ctx.request.body.email;

    try {
      const advancedConfigs = await strapi
        .store({
          environment: "",
          type: "plugin",
          name: "users-permissions",
          key: "advanced"
        })
        .get();

      if (advancedConfigs.unique_email && newEmail) {
        const users = await strapi.plugins[
          "users-permissions"
        ].services.user.fetchAll({ email: newEmail });

        if (
          users &&
          _.find(
            users,
            user => (user.id || user._id).toString() !== (user.id || user._id)
          )
        ) {
          return ctx.badRequest(
            null,
            ctx.request.admin
              ? [
                  {
                    messages: [
                      { id: "Auth.form.error.email.taken", field: ["email"] }
                    ]
                  }
                ]
              : "Email is already taken."
          );
        }
      }

      const data = await strapi.plugins["users-permissions"].services.user.edit(
        { id: user.id },
        { email: newEmail }
      );

      // Send 200 `ok`
      ctx.send(data);
    } catch (error) {
      ctx.badRequest(
        null,
        ctx.request.admin
          ? [{ messages: [{ id: error.message, field: error.field }] }]
          : error.message
      );
    }
  }
};
