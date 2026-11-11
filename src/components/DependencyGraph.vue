<script setup lang="ts">
import * as vNG from "v-network-graph"
import {
    ForceLayout,
    ForceNodeDatum,
    ForceEdgeDatum,
} from "v-network-graph/lib/force-layout"
import { reactive } from "vue"
import { Nodes, Edges } from "v-network-graph"


const nodes: Nodes = {
    node1: { name: "N1" },
    node2: { name: "N2" },
    node3: { name: "N3" },
    node4: { name: "N4" },
    node5: { name: "N5" },
    node6: { name: "N6" },
}

const edges: Edges = {
    edge1: { source: "node1", target: "node2" },
    edge2: { source: "node2", target: "node3" },
    edge3: { source: "node2", target: "node4" },
    edge4: { source: "node4", target: "node5" },
    edge5: { source: "node4", target: "node6" },
    edge6: { source: "node1", target: "node5" },
}

const configs = reactive(
    vNG.defineConfigs({
        view: {
            layoutHandler: new ForceLayout({
                positionFixedByDrag: false,
                positionFixedByClickWithAltKey: true,
                createSimulation: (d3, nodes, edges) => {
                    // d3-force parameters
                    const forceLink = d3
                        .forceLink<ForceNodeDatum, ForceEdgeDatum>(edges)
                        .id(d => d.id)
                    return d3
                        .forceSimulation(nodes)
                        .force("edge", forceLink.distance(400).strength(0.5))
                        .force("charge", d3.forceManyBody().strength(-800))
                        .force("center", d3.forceCenter().strength(0.05))
                        .alphaMin(0.001)
                },
            }),
        },
        node: {
            label: {
                visible: true,
            },
        },
        edge: {
            marker: {
                source: {
                    type: "arrow"
                }
            }
        }
    })
)

</script>

<template class="h-screen">
    <div class="h-screen">

        <v-network-graph :zoom-level="0.5" :nodes="nodes" :edges="edges" :configs="configs"
            class="bg-gray-200 flex flex-col h-screen" />
    </div>
</template>