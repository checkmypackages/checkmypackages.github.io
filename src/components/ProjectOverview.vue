<script setup lang="ts">
import { useDevGraphStore } from "../stores/devGraph.ts"
import { file2graph } from "./helpers/file2graph.ts"

const devGraphStore = useDevGraphStore()


const handleFileUpload = (event: Event) => {
  console.log("File upload event:", event)
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        console.log("File content:", e.target?.result)
        const json = JSON.parse(e.target?.result as string)
        console.log("Parsed JSON:", json)
        file2graph(file).then(({ nodes: new_nodes, edges: new_edges }) => {
          devGraphStore.setGraph(new_nodes, new_edges)
          console.log("Graph updated with new nodes and edges")
        })
      } catch (error) {
        console.error("Invalid JSON file", error)
      }
    }
    reader.readAsText(file)
  }
}

</script>

<template>
  <div class="w-lg bg-red-200">
    <label for="project-file-upload"
      class="inline-block cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
      Upload file
    </label>
    <input id="project-file-upload" type="file" @change="handleFileUpload" class="sr-only" accept=".json" />
  </div>
</template>
