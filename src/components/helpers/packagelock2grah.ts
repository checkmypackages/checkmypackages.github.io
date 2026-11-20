import { Nodes, Edges } from "v-network-graph"

function addEdges(edges: Edges, source: string, target: string) {
    const edgeId = `edge_${Object.keys(edges).length + 1}`
    edges[edgeId] = { source, target }
}
export const packagelock2graph = async (file: File): Promise<{ nodes: Nodes; edges: Edges; }> => {
    // Implement the logic to convert a file to a graph representation
    console.log(file); // For now, just log the file to the console
    const content = await file.text()
    const json = JSON.parse(content)
    let nodes: Nodes = {}
    let edges: Edges = {}

    for (const key in json.packages) {
        const packageEntry = json.packages[key]
        nodes[packageEntry.name] = { name: packageEntry.name }

        if (packageEntry.dependencies) {
            for (const dep in packageEntry.dependencies) {
                addEdges(edges, packageEntry.name, dep)
            }
        }
    }
    return {
        nodes,
        edges
    };
};