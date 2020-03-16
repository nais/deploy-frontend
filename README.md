![](https://github.com/nais/deploy-frontend/workflows/Build%20and%20deploy%20nais-deploy-frontend/badge.svg)

# Nais deploy frontend 

TODO

## Local development

### Offline mode
This spins up an Express server serving the frontend and has a simple hardcoded mock that acts as hookd's api. 
Useful for working on frontend stuff and you do not care about Azure AD authentication. This mode has no integration with Azure.

```
npm install -g yarn 
yarn run offline
```

Go to localhost:6969 to launch app

### With Azure AD login. 

Requires a valid .env file with Azure AD config

```
npm install -g yarn 
yarn run dev
```

Go to localhost:8080 to launch app

#### With Azure AD login and local backend mock

If you don't want to have hook running locally but want to test Azure AD integration, you can use the offline mode as a mock for Hookd. 

Set the following in your local .env file

```
DOWNSTREAM_API_URL="http://localhost:6969/api"
DOWNSTREAM_API_PATH="api"
```

```
# The two run commands should be launched in separate terminals so that they both are running. 
npm install -g yarn 
yarn run offline 
yarn run dev
```

When you for example make a call to localhost:8080/api/apikey, an Azure AD access token is created and the api call is proxied to the "backend" (localhost:6969). The offline mock does not validate the token. Still this mode gives us an opertunity to test the AAD integration works.





## Contact

For external contact one of:

- Mats Byfuglien (mats.byfuglien@nav.no)

For NAV-employees use #nais on our internal Slack
