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
        if (key === "") {
            packageName = packageEntry.name
        } else {
            packageName = key.replace("node_modules/", "")
        }
        nodes[packageName] = { name: packageName, version: packageEntry.version }

        if (packageEntry.dependencies) {
            addEdges(packageEntry.dependencies, edges, packageName, "Prod")
        }

        if (packageEntry.devDependencies) {
            addEdges(packageEntry.devDependencies, edges, packageName, "Dev")
        }
        if (packageEntry.optionalDependencies) {
            addEdges(packageEntry.optionalDependencies, edges, packageName, "Optional")
        }
        if (packageEntry.peerDependencies) {
            addEdges(packageEntry.peerDependencies, edges, packageName, "Peer")
        }
        if (packageEntry.bundleDependencies) {
            addEdges(packageEntry.bundleDependencies, edges, packageName, "Bundle")
        }
        

    }
    return {
        nodes,
        edges
    };
};