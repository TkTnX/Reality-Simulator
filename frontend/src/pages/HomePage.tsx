import { Background, Controls, ReactFlow } from "@xyflow/react";
import { useState } from "react";
import type { WishType } from "../types";
import { createEdges, createNodes } from "../helpers";
import { AnnotationNode, FormNode } from "../components";
import ResizerNode from "../components/ResizerNode";
import CircleNode from "../components/CircleNode";
import TextInputNode from "../components/TextInputNode";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  annotation: AnnotationNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextInputNode,
};

export const HomePage = () => {
  const [wish, setWish] = useState<WishType | null>(null);

  return (
    <ReactFlow
      className="h-screen"
      nodes={[
        ...(wish
          ? createNodes(wish)
          : [
              {
                id: "form",
                type: "input",
                className: "w-100!",
                data: {
                  label: <FormNode setWish={setWish} />,
                },
                position: { x: 150, y: 300 },
              },
            ]),
      ]}
      edges={[...(wish ? createEdges(wish) : [])]}
      fitView
      attributionPosition="top-center"
      nodeTypes={nodeTypes}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
};
