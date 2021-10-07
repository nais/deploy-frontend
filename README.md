# NAIS deploy frontend ![](https://github.com/nais/deploy-frontend/workflows/Build%20and%20deploy%20nais-deploy-frontend/badge.svg)

TODO

## Local development

1. You need to have `yarn` installed locally. Installed with your favorite package manager or via `npm`.

### Offline mode

This spins up a local JSON server that mocks the API responses that matches what the real server responds with. This is useful for when what you need to work with do not require AAD.

```
yarn offline
```

Go to `http://localhost:3000` to show the running web application.

### With Azure AD login.

Requires a valid .env file with Azure AD config, the bare minimum `.env` file can be copied from `.env.example` so that the Express application starts.

**Note:** this requires you to have built the frontend, run `yarn build` first.

```
yarn start
```

Go to localhost:8081 to launch app

#### With Azure AD login and local backend mock

If you don't want to have hook running locally but want to test Azure AD integration, you can use the offline mode as a mock for Hookd.

Set the following in your local .env file (or copy from `.env.example`).

```
DOWNSTREAM_API_URL="http://localhost:4000"
DOWNSTREAM_API_PATH="api"
```

```
# The two run commands should be launched in separate terminals so that they both are running.
yarn offline
yarn start
```

When you for example make a call to localhost:8080/api/apikey, an Azure AD access token is created and the api call is proxied to the "backend" (localhost:6969). The offline mock does not validate the token. Still this mode gives us an opertunity to test the AAD integration works.

## Contact

For external contact one of:

- Mats Byfuglien (mats.byfuglien@nav.no)

For NAV-employees use #nais on our internal Slack
