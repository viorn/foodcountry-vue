<template>
<div>
  <a class="button" @click="createIngredient.isShow=true">Добавить</a>
  <portal to="modal">
    <div class="modal" :class="{ 'is-active': createIngredient.isShow }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Добавление ингредиента</p>
          <button class="delete" aria-label="close" @click="createIngredient.isShow=false"></button>
        </header>
        <section class="modal-card-body">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Имя</label>
            </div>
            <div class="field-body">
              <input class="input" v-model="createIngredient.name" type="text">
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label ">Белки</label>
            </div>
            <div class="field-body">
              <input class="input" v-model="createIngredient.squirrels" type="number">
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label ">Жиры</label>
            </div>
            <div class="field-body">
              <input class="input" v-model="createIngredient.fats" type="number" placeholder="Fats input">
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label ">Угдеводы</label>
            </div>
            <div class="field-body">
              <input class="input" v-model="createIngredient.carbohydrates" type="number">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="pushIngredient()">Добавить</button>
          <button class="button" @click="createIngredient.isShow=false">Отмена</button>
        </footer>
      </div>
    </div>
  </portal>
  <a class="button" @click="updateList()">Обновить</a>
</div>
</template>

<script>
import * as rest from '@/modules/Rest.js';
import {
  EventBus
} from '@/main.js';
export default {
  name: 'IngredientsToolsPanel',
  data() {
    return {
      createIngredient: {
        isShow: false,
        name: "",
        squirrels: 0,
        fats: 0,
        carbohydrates: 0
      }
    }
  },
  methods: {
    pushIngredient: function() {
      rest.addIngredient(this.createIngredient).then((res) => {
        EventBus.$emit('update_ingredients_list');
        this.createIngredient.isShow = false;
        this.createIngredient.name = ""
        this.createIngredient.squirrels = 0
        this.createIngredient.fats = 0
        this.createIngredient.carbohydrates = 0
      })
    },
    updateList: function() {
      EventBus.$emit('update_ingredients_list');
    }
  }
}
</script>
