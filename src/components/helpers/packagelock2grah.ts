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
        let packageName: string
        if (key === "") {
            packageName = packageEntry.name
        } else {
            packageName = key.replace("node_modules/", "")
        }
        nodes[packageName] = { name: packageName }

        if (packageEntry.dependencies) {
            for (const dep in packageEntry.dependencies) {
                addEdges(edges, packageName, dep)
            }
        }
    }
    return {
        nodes,
        edges
    };
};