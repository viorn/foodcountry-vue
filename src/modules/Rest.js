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
  return rest().post('v1/public/user/auth', {
    username: email,
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
  var refreshToken = localStorage.getItem('authToken');
  return rest().post('v1/public/user/auth', {
    refreshToken: refreshToken
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
    return rest().get('v1/ingredients', {
      params: {
        page: page - 1,
        pageCount: limit
      }
    });
  });
}

export function addIngredient(ingredient) {
  return executeOrRefresh(function() {
    return rest().post('v1/ingredient', {
      name: ingredient.name,
      squirrels: ingredient.squirrels,
      fats: ingredient.fats,
      carbohydrates: ingredient.carbohydrates,
      visibleType: 0
    });
  })
}

export function saveIngredient(ingredient) {
  return executeOrRefresh(function() {
    return rest().post('v1/ingredient', {
      id: ingredient.id,
      name: ingredient.name,
      squirrels: ingredient.squirrels,
      fats: ingredient.fats,
      carbohydrates: ingredient.carbohydrates,
      visibleType: 0
    });
  })
}

export function deleteIngredientById(ingredientId) {
  return executeOrRefresh(function() {
    return rest().delete(`v1/ingredient/${ingredientId}`);
  })
}