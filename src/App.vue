<script setup lang="ts">
import DependencyGraph from "./components/DependencyGraph.vue"
import ProjectOverview from "./components/ProjectOverview.vue"

</script>

<template class="h-screen">
  <div class="h-screen flex">
    <DependencyGraph class="flex-grow"/>
    <ProjectOverview />
  </div>
</template>