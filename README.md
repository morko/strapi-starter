# Strapi starter

This app is a starter for Strapi using Mongo DB.

Features
- Pre-configured content type called Article.
- Custom route `PUT /users/me` for Users to be able to edit their email.

# Quick start

1. **Create a repository using this template.**

2. **Make sure you have Mongo DB installed and running.**

3. **Configure `config/environments/development/database.json` to match your
   Mongo DB setup.**

4. **Start strapi in development**

    ```sh
    cd your_repository
    npm run develop
    ```

# Deploy

Due to restrictions in Webpack the build can be only ran in machines that have more than 1Gb ram available.
To overcome this build the project in your local machine and use `scp` to copy the directory into the remote host.

```sh
NODE_ENV=production npm build
scp -r build remote_host:~/your-strapi-app/
```
