<template>
<div class="modal" :class="{ 'is-active': isShow }">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{title}}</p>
      <button class="delete" aria-label="close" @click="clickToCancel()"></button>
    </header>
    <section class="modal-card-body">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Имя</label>
        </div>
        <div class="field-body">
          <input class="input" v-model="ingredient.name" type="text">
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label ">Белки</label>
        </div>
        <div class="field-body">
          <input class="input" v-model="ingredient.squirrels" type="number">
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label ">Жиры</label>
        </div>
        <div class="field-body">
          <input class="input" v-model="ingredient.fats" type="number">
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label ">Угдеводы</label>
        </div>
        <div class="field-body">
          <input class="input" v-model="ingredient.carbohydrates" type="number">
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="clickToSuccess()">{{succesButton}}</button>
      <button class="button" @click="clickToCancel()">Отмена</button>
    </footer>
  </div>
</div>
</template>
<script>
export default {
  name: 'CreateIngredientsModal',
  data() {
    return {
      isShow: false,
      title: "Добавление ингредиента",
      succesButton: "Добавить",
      ingredient: {
        name: "",
        squirrels: "",
        fats: "",
        carbohydrates: ""
      }
    }
  },
  methods: {
    callback: function(){},
    clickToCancel(){
      this.ingredient = {
        id: null,
        name: "",
        squirrels: "",
        fats: "",
        carbohydrates: ""
      }
      this.isShow = false
    },
    clickToSuccess() {
      this.callback(this.ingredient)
      this.isShow = false
      this.ingredient = {
        name: "",
        squirrels: "",
        fats: "",
        carbohydrates: ""
      }
    },
    show: function(ingredient, params) {
      if (ingredient!=null) {
        this.ingredient = ingredient
      } else {
        this.ingredient = {
          name: "",
          squirrels: "",
          fats: "",
          carbohydrates: ""
        }
      }
      this.title = params.title
      this.succesButton = params.succesButton
      this.callback = params.callback
      this.isShow = true
    }
  }
}
</script>
