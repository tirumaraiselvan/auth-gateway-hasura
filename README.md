# Gateway Auth Webhook for Hasura GraphQL engine

This is a sample auth gateway for authenticating requests to the Hasura GraphQL engine 

It has boilerplate code written in `server.js` where you can handle authentication.

The main idea is to proxy the auth based on `x-app` header or something similar.

## Quick deploy

### Deploy with Heroku (recommended)

Run the following commands:

```

git clone https://github.com/hasura/graphql-engine
cp -r graphql-engine/community/boilerplates/auth-webhooks/nodejs-express <some-dir>
cd <some-dir>
git init && git add . && git commit -m "init auth webhook"
```

You need to setup a Heroku app:

```
heroku create app
git push heroku master
```
