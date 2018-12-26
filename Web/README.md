# Dimiwords-Web
Dimiwords Web App with Vue.js

## Setup API server URL

Change following code in `Web/src/main.js` to your running API server URL

```js
Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000/" // api server url
});
```
