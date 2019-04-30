<template>
<div>
  <IngredientsToolsPanel id="ingredientsToolsPanel" />
  <IngredientsTable id="ingredientsTable" />
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
