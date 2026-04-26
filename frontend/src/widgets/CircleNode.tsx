/* eslint-disable react-refresh/only-export-components */
import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

interface Props {
  id: string;
  positionAbsoluteX: number;
  positionAbsoluteY: number;
}

export default memo(({ positionAbsoluteX, positionAbsoluteY }: Props) => {
  const label = `Position x:${Math.round(positionAbsoluteX)} y:${Math.round(positionAbsoluteY)}`;

  return (
    <div>
      <div>{label || "no node connected"}</div>
      <Handle
        type="target"
        position={Position.Left}
        className="custom-handle"
      />
    </div>
  );
});
