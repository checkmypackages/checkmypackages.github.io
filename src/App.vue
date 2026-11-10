<script setup lang="ts">
import DependencyGraph from "./components/DependencyGraph.vue"

</script>

<template class="h-screen">
  <div class="h-screen flex">
    <DependencyGraph class="flex-grow"/>
    <div class="w-lg bg-red-200">
      side bar
    </div>
  </div>
</template>