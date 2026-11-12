import { defineStore } from 'pinia'
import { Nodes, Edges } from "v-network-graph"

export type DevGraph = {
    nodes: Nodes;
    edges: Edges;
}

export const useDevGraphStore = defineStore('devGraph', {
    state: () => ({
        nodes: {
            node1: { name: "N1" },
            node2: { name: "N2" },
            node3: { name: "N3" },
            node4: { name: "N4" },
            node5: { name: "N5" },
            node6: { name: "N6" }
        },
        edges: {
            edge1: { source: "node1", target: "node2" },
            edge2: { source: "node2", target: "node3" },
            edge3: { source: "node2", target: "node4" },
            edge4: { source: "node4", target: "node5" },
            edge5: { source: "node4", target: "node6" },
            edge6: { source: "node1", target: "node5" },
        }
    } as DevGraph),
})