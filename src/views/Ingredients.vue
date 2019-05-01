<template>
<div>
  <IngredientsToolsPanel id="ingredientsToolsPanel" ref="ingredientsToolsPanel" v-on:needUpdate="$refs.ingredientsTable.updatePage()"/>
  <IngredientsTable id="ingredientsTable" ref="ingredientsTable" v-on:selectItemCallback="selectItemCallback($event)"/>
</div>
</template>

<script>
import IngredientsTable from '@/components/IngredientsTable.vue'
import IngredientsToolsPanel from '@/components/IngredientsToolsPanel.vue'

export default {
  name: 'ingredients',
  components: {
    IngredientsTable,
    IngredientsToolsPanel
  },
  methods: {
    selectItemCallback: function(ingredient) {
      this.$refs.ingredientsToolsPanel.selectedIngredient = ingredient
    }
  }
}
</script>

<style lang="scss">
#toolsPanel {
    margin: 16px;
    padding: 16px;
}

#ingredientsToolsPanel {
    margin-top: 16px;
    margin-left: 16px;
    margin-right: 16px;
}

#ingredientsTable {
    margin-top: 16px;
    margin-left: 16px;
    margin-right: 16px;
}
</style>
