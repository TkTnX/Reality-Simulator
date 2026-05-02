const idMap = new Map();

function generateUniqueId(node) {
  const id = `node_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  if (idMap.has(id)) return generateUniqueId();
  idMap.set(id, true);
  return id;
}

export function processNode(node) {
    node.id = generateUniqueId();
    if (node.children && node.children.length > 0) {
        node.children = node.children.map(child => processNode(child))
    }
    return node
}