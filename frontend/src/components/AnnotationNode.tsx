import { memo } from "react";

interface Props {
  data: {
    label: string;
    level: string;
    arrowStyle: Record<string, string>;
  };
}

export const AnnotationNode = memo(({ data }: Props) => {
  return (
    <>
      <div className="annotation-content">
        <div className="annotation-level">{data.level}.</div>
        <div>{data.label}</div>
      </div>
      {data.arrowStyle && (
        <div className="annotation-arrow" style={data.arrowStyle}>
          ⤹
        </div>
      )}
    </>
  );
});
