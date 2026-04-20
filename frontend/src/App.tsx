/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./constants/initial-elements";
import ResizerNode from "./components/ResizerNode";
import CircleNode from "./components/CircleNode";
import TextInputNode from "./components/TextInputNode";
import AnnotationNode from "./components/AnnotationNode";
import ButtonEdge from "./components/ButtonEdge";

const nodeTypes = {
  annotation: AnnotationNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextInputNode,
};

const edgeTypes = {
  button: ButtonEdge,
};

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <ReactFlow
      className="h-screen"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default OverviewFlow;
