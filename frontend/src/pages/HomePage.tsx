import { Background, Controls, ReactFlow } from "@xyflow/react";
import { useState } from "react";
import "@xyflow/react/dist/style.css";
import { createEdges, createNodes, type WishType } from "../shared";
import ResizerNode from "../widgets/ResizerNode";
import { AnnotationNode } from "../widgets";
import CircleNode from "../widgets/CircleNode";
import TextInputNode from "../widgets/TextInputNode";
import { FormNode } from "../features";

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
