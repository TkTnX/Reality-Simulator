/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ReactFlow, Controls, Background } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import CircleNode from "./components/CircleNode";
import TextInputNode from "./components/TextInputNode";

import {
  FormNode,
  AnnotationNode,
  ResizerNode,
} from "./components";
import type { WishType } from "./types";
import { createEdges, createNodes } from "./helpers";
const nodeTypes = {
  annotation: AnnotationNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextInputNode,
};

const OverviewFlow = () => {
  const [wish, setWish] = useState<WishType | null>(null);
  console.log(wish);
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

export default OverviewFlow;
