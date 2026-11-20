import { Nodes, Edges } from "v-network-graph"
import { packagelock2graph } from "./packagelock2grah.ts"

export const file2graph = async (file: File): Promise<{ nodes: Nodes; edges: Edges }> => {
    // Implement the logic to convert a file to a graph representation
    if (file.name === "package-lock.json") {
        return packagelock2graph(file)
    } else {
        console.warn("Unsupported file type:", file.name)
        return { nodes: {}, edges: {} } // Return an empty graph for unsupported file types
    }
};