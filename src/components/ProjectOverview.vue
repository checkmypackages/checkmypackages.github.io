<script setup lang="ts">
import { Nodes, Edges } from "v-network-graph"
import { useDevGraphStore } from "../stores/devGraph.ts"

const devGraphStore = useDevGraphStore()
const new_nodes: Nodes = {
  node1: { name: "Node1" },
  node2: { name: "Node2" },
  node3: { name: "Node3" },
  node4: { name: "Node4" },
  node5: { name: "Node5" },
  node6: { name: "Node6" },
  node7: { name: "Node7" }
}
const new_edges: Edges = {
  edge1: { source: "node1", target: "node2" },
  edge2: { source: "node2", target: "node3" },
  edge3: { source: "node2", target: "node4" },
  edge4: { source: "node4", target: "node5" },
  edge5: { source: "node4", target: "node6" },
  edge6: { source: "node1", target: "node5" },
  edge7: { source: "node6", target: "node7" },
  edge8: { source: "node7", target: "node1" }
}

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
        devGraphStore.setGraph(new_nodes, new_edges)
        console.log("Graph updated with new nodes and edges")
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
