/* eslint-disable @typescript-eslint/no-explicit-any */
import { VariantItem } from "../components";
import type { WishType } from "../types";

export const createNodes = (
  wish: WishType,
  level: number = 0,
  startX: number = 0,
): any[] => {
  const nodes = [];
  const width = getTreeWidth(wish);
  const xCenter = startX + width / 2;

  nodes.push({
    id: wish.id,
    type: level === 0 ? "input" : "default",
    className: "w-50!",
    data: {
      label: <VariantItem wish={wish} />,
    },
    position: { x: xCenter * 250, y: level * 250 },
    sourcePosition: "bottom",
    targetPosition: "top",
  });

  let currentX = startX;

  if (wish.children) {
    wish.children.forEach((child) => {
      const childWidth = getTreeWidth(child);
      nodes.push(...createNodes(child, level + 1, currentX));

      currentX += childWidth;
    });
  }
  return nodes;
};

export const createEdges = (wish: WishType): any[] => {
  const edges: any[] = [];
  if (wish.children && wish.children.length > 0) {
    wish.children.forEach((child) => {
      edges.push({
        id: `${wish.id}-${child.id}`,
        source: wish.id,
        target: child.id,
        type: "step",
      });
      edges.push(...createEdges(child));
    });
  }

  return edges;
};

const getTreeWidth = (node: WishType) => {
  if (!node.children || node.children.length === 0) return 1;

  return node.children.reduce(
    (sum, child): number => sum + getTreeWidth(child),
    0,
  );
};
