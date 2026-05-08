export function findNode(tree, nodeId) {
    if (tree.id === nodeId) {
        return tree;
    }

    if (!tree.children) return null;

    for (const child of tree.children) {
        const found = findNode(child, nodeId);

        if(found) return found
    }

    return null
}

export function updateNode(tree, nodeId, newChildren) {
    if (tree.id === nodeId) {
        return {
            ...tree,
            children: [...(tree.children || []), ...newChildren]
        }
    }

    if (!tree.children) return tree;
    
    return {
        ...tree,
        children: tree.children.map((child) => updateNode(child, nodeId, newChildren))
    }
}