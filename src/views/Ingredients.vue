<template>
<div>
  <IngredientsTable id="ingredientsTable"/>
</div>
</template>

<script>

import IngredientsTable from '@/components/IngredientsTable.vue'

export default {
  name: 'ingredients',
  components: {
    IngredientsTable
  }
}

</script>

<style lang="scss">
#toolsPanel {
    margin: 16px;
    padding: 16px;
}

#ingredientsTable {
    margin-left: 16px;
    margin-right: 16px;
}
</style>
