# Quasar App

## Requirement
- Node.js > v8.9.0
- Yarn installed

## Installation

```sh
cd todoapp
# Install quasar framework
npm i -g @quasar/cli
# for front end
yarn install
# for back end (Install and start back end http://localhost:3010)
make serve
# Start front end (Single Page Application)
quasar dev --mode spa
# Start front end (Progressive Web App)
quasar dev --mode pwa
# Start front end (Server Side Rendering)
quasar dev --mode ssr
# Start Desktop app (Electron)
quasar dev --mode electron
```

# Testing

- Test covered for Unit Test in Vuex and Intergration test in Vue.js with Jest.

```sh
# Unit Test
yarn test:unit
# Unit Test for dev
yarn test:unit:watchAll
# UI for Unit Test
yarn test:unit:ui
```

- End-to-End testing is available with Cypress
