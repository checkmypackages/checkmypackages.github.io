import { describe, expect, it } from "vitest"
import type { Edges, Nodes } from "v-network-graph"
import { addTypes2Nodes } from "./devGraph"

describe("addTypes2Nodes", () => {
    it("adds each edge type to its target node", () => {
        const nodes: Nodes = {
            source: { name: "Source" },
            target: { name: "Target" },
        }
        const edges: Edges = {
            first: { source: "source", target: "target", type: "runtime" },
            second: { source: "source", target: "target", type: "development" },
        }

        addTypes2Nodes(nodes, edges)

        expect(nodes.target.types).toEqual(["runtime", "development"])
        expect(nodes.source).not.toHaveProperty("types")
    })

    it("preserves existing types and does not add duplicates", () => {
        const nodes: Nodes = {
            target: { name: "Target", types: ["runtime"] },
        }
        const edges: Edges = {
            first: { source: "source", target: "target", type: "runtime" },
            second: { source: "source", target: "target", type: "development" },
            third: { source: "source", target: "target", type: "development" },
        }

        addTypes2Nodes(nodes, edges)

        expect(nodes.target.types).toEqual(["runtime", "development"])
    })

    it("ignores edges without a type", () => {
        const nodes: Nodes = {
            source: { name: "Source" },
            target: { name: "Target" },
        }
        const edges: Edges = {
            untyped: { source: "source", target: "target" },
        }

        addTypes2Nodes(nodes, edges)

        expect(nodes.target).not.toHaveProperty("types")
        expect(nodes.source).not.toHaveProperty("types")
    })
})
