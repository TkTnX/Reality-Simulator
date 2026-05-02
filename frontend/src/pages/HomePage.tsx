/* eslint-disable react-hooks/set-state-in-effect */
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import {
  createEdges,
  createNodes,
  getTreeWidth,
  useWishes,
  type WishType,
} from "../shared";
import ResizerNode from "../widgets/ResizerNode";
import { AnnotationNode, Header } from "../widgets";
import CircleNode from "../widgets/CircleNode";
import TextInputNode from "../widgets/TextInputNode";
import { FormNode } from "../features";

const nodeTypes = {
  annotation: AnnotationNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextInputNode,
};

// TODO: ФОРМА НЕ ИСЧЕЗАЕТ ПОСЛЕ СОЗДАНИЯ

export const HomePage = () => {
  const [wishes, setWishes] = useState<WishType[]>([]);
  const { getUserWishesQuery } = useWishes();
  const { data } = getUserWishesQuery();
  const [wish, setWish] = useState<WishType | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!data) return;
    setWishes(data);
  }, [data]);
  useEffect(() => {
    let totalXOffset = 0;

    const newNodes = [
      ...(wishes && wishes.length > 0
        ? wishes.flatMap((wish) => {
            const nodes = createNodes(wish, 0, 0);
            const offsetNodes = nodes.map((node) => ({
              ...node,
              position: {
                ...node.position,
                x: node.position.x + totalXOffset,
              },
            }));

            const treeWidth = getTreeWidth(wish) * 250 + 300;
            totalXOffset += treeWidth;

            return offsetNodes;
          })
        : []),
      ...(wish
        ? createNodes(wish, 0, -10)
        : [
            {
              id: "form",
              type: "input",
              className: "w-100!",
              data: {
                label: <FormNode setWish={setWish} />,
              },
              position: { x: -700, y: 300 },
              draggable: true,
            },
          ]),
    ];

    const newEdges = [
      ...(wishes && wishes.flatMap((wish) => createEdges(wish))),
      ...(wish ? createEdges(wish) : []),
    ];

    setNodes(newNodes as never[]);
    setEdges(newEdges as never[]);
  }, [wishes, wish, setNodes, setEdges]);

  return (
    <>
      <Header />
      <ReactFlow
        className="h-screen"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="top-center"
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </>
  );
};
