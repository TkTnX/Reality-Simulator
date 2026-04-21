/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  Controls,
  Background,
  useEdgesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { edges as initialEdges } from "./constants/initial-elements";
import CircleNode from "./components/CircleNode";
import TextInputNode from "./components/TextInputNode";

import {
  FormNode,
  AnnotationNode,
  ResizerNode,
  VariantItem,
} from "./components";
const nodeTypes = {
  annotation: AnnotationNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextInputNode,
};

const OverviewFlow = () => {
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <ReactFlow
      className="h-screen"
      nodes={[
        {
          id: "1-1",
          type: "input",
          className: "w-100!",
          data: {
            label: <FormNode />,
          },
          position: { x: 150, y: 300 },
        },
        {
          id: "1-2",
          type: "default",
          className: "w-50!",
          data: {
            label: <VariantItem />,
          },
          position: { x: 0, y: 500 },
        },
        {
          id: "1-3",
          type: "output",
          className: "w-50!",
          data: {
            label: <VariantItem />,
          },
          position: { x: 600, y: 500 },
        },
      ]}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
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
