import axios from 'axios';

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

export function auth(email, password) {
  return rest().post('public/user/auth', {
    name: email,
    password: password
  }).then(function(response) {
    localStorage.setItem('authToken', response.data.authToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
  });
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
}

export function refreshToken() {
  var authToken = localStorage.getItem('authToken');
  var refreshToken = localStorage.getItem('refreshToken');
  return rest().post('public/user/refresh', {
    refreshToken: refreshToken,
    authToken: authToken
  }).then(function(response) {
    localStorage.setItem('authToken', response.data.authToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return new Promise(function(resolve, reject) {
      resolve(response)
    });
  }).catch(function(err) {
    return new Promise(function(resolve, reject) {
      reject(err)
    });
  });
}

function executeOrRefresh(restRequest) {
  return restRequest().catch(function(err) {
    if (err.response.status == 401) {
      return refreshToken().then(function(res) {
        return restRequest();
      });
    }
  })
}

export function loadIngredients(page, limit) {
  return executeOrRefresh(function() {
    return rest().get(`ingredient/list/${page - 1}`, {
      params: {
        limit: limit
      }
    });
  });
}

export function addIngredient(ingredient) {
  return executeOrRefresh(function() {
    return rest().post('ingredient/add', {
      ingredient: {
        name: ingredient.name,
        squirrels: parseInt(ingredient.squirrels, 0),
        fats: parseInt(ingredient.fats, 0),
        carbohydrates: parseInt(ingredient.carbohydrates, 0),
        visible: 'PUBLIC'
      }
    });
  })
}

export function saveIngredient(ingredient) {
  return executeOrRefresh(function() {
    return rest().post(`ingredient/edit/${ingredient.id}`, {
      ingredient: {
        name: ingredient.name,
        squirrels: parseInt(ingredient.squirrels, 0),
        fats: parseInt(ingredient.fats, 0),
        carbohydrates: parseInt(ingredient.carbohydrates, 0),
        visible: 'PUBLIC'
      }
    });
  })
}

export function deleteIngredientById(ingredientId) {
  return executeOrRefresh(function() {
    return rest().delete(`ingredient/${ingredientId}`);
  })
}

export function getUsers(page, limit) {
  return executeOrRefresh(function() {
    return rest().get(`admin/user/list/${page - 1}`, {
      params: {
        limit: limit
      }
    });
  });
}