<template>
<div>
  <a class="button" @click="clickToCreate()">Добавить</a>
  <a class="button" @click="updateList()">Обновить</a>
  <a class="button" v-bind:disabled="selectedIngredient==null" @click="clickToEdit()">Редактировать</a>
  <a class="button" v-bind:disabled="selectedIngredient==null" @click="clickToDelete()">Удалить</a>
  <portal to="modal">
    <CreateIngredientsModal ref="createIngredientModal" v-on:clickToSuccess="pushIngredient($event)"/>
    <SimpleDialog ref="deleteModal"/>
  </portal>
</div>
</template>

<script>
import * as rest from '@/modules/Rest.js';
import CreateIngredientsModal from '@/components/modals/CreateIngredients.vue'
import SimpleDialog from '@/components/modals/SimpleDialog.vue'
export default {
  name: 'IngredientsToolsPanel',
  components: {
    'CreateIngredientsModal': CreateIngredientsModal,
    'SimpleDialog': SimpleDialog,
  },
  data() {
    return {
      selectedIngredient: null
    }
  },
  methods: {
    pushIngredient(ingredient) {
      rest.addIngredient(ingredient).then((res) => {
        this.$emit('needUpdate');
      })
    },
    saveIngredient(ingredient) {
      rest.saveIngredient(ingredient).then((res) => {
        this.$emit('needUpdate');
      })
    },
    deleteIngredient(ingredient) {
      rest.deleteIngredientById(ingredient.id).then((res) => {
        this.$emit('needUpdate');
        this.selectedIngredient = null;
      })
    },
    updateList() {
      this.$emit('needUpdate')
    },
    clickToCreate() {
      this.$refs.createIngredientModal.show(null,
        {
            title: "Добавление ингредиента",
            succesButton: "Добавить",
            callback: this.pushIngredient
        })
    },
    clickToEdit() {
      this.$refs.createIngredientModal.show(Object.assign({}, this.selectedIngredient),
        {
            title: "Редактирование ингредиента",
            succesButton: "Сохранить",
            callback: this.saveIngredient
        })
    },
    clickToDelete() {
      let vm = this
      this.$refs.deleteModal.show({
        title: "Удалить ингредиент?",
        message: `Вы действительно хотите удалить ингредиент ${vm.selectedIngredient.id}:${vm.selectedIngredient.name}?`,
        callback: ()=>{vm.deleteIngredient(vm.selectedIngredient)}
      })
    }
  }
}
</script>
