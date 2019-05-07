# foodcountry-vue

You need checking rest baseURL in src/modules/Rest.js
```
function rest() {
  if (localStorage.getItem('authToken') != null)
    return axios.create({
      baseURL: 'http://127.0.0.1:8080/',
      timeout: 1000,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      }
    });
  else
    return axios.create({
      baseURL: 'http://127.0.0.1:8080/',
      timeout: 1000
    });
}
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
