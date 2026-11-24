import { Nodes, Edges } from "v-network-graph"

function addEdges(dependencies: { [key: string]: string }, edges: Edges, packageName: string, type: string) {
    for (const dep in dependencies) {
        const edgeId = `edge_${Object.keys(edges).length + 1}`
        edges[edgeId] = { source: packageName, target: dep, type }
    }
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
        let packageProperties = { version: packageEntry.version, isRoot: false }
        if (key === "") {
            packageName = packageEntry.name
            packageProperties.isRoot = true
        } else {
            packageName = key.replace("node_modules/", "")
        }
        nodes[packageName] = { name: packageName, ...packageProperties }

        addEdges(packageEntry.dependencies, edges, packageName, "Prod")
        addEdges(packageEntry.devDependencies, edges, packageName, "Dev")
        addEdges(packageEntry.optionalDependencies, edges, packageName, "Optional")
        addEdges(packageEntry.peerDependencies, edges, packageName, "Peer")
        addEdges(packageEntry.bundleDependencies, edges, packageName, "Bundle")
    }
    return {
        nodes,
        edges
    };
};