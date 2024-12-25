import React from "react";
import ReactFlow, {
  Node,
  Edge,
  MiniMap,
  Controls,
  ReactFlowProvider,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

interface JsonVisualizerProps {
  data: Record<string, unknown>;
}

const JsonVisualizer: React.FC<JsonVisualizerProps> = ({ data }) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Function to generate node colors and additional data
  const getNodeStyles = (value: unknown) => {
    if (typeof value === "string")
      return { backgroundColor: "#a5d6a7", color: "#1b5e20" };
    if (typeof value === "number")
      return { backgroundColor: "#ffe0b2", color: "#bf360c" };
    if (Array.isArray(value))
      return { backgroundColor: "#b3e5fc", color: "#0288d1" };
    if (typeof value === "object")
      return { backgroundColor: "#e1bee7", color: "#8e24aa" };
    return { backgroundColor: "#ffffff", color: "#000000" };
  };

  // Recursive function to traverse JSON data
  const traverseJson = (
    obj: Record<string, unknown>,
    parentId: string | null = null,
    depth: number = 0,
    column: number = 0,
    yOffset: number = 0
  ) => {
    Object.entries(obj).forEach(([key, value], index) => {
      const id = `${parentId ? `${parentId}-` : ""}${key}-${depth}-${index}`;

      // Create a node for each key
      const nodeStyle = getNodeStyles(value);
      nodes.push({
        id,
        data: {
          label: `${key}: ${typeof value === "object" ? "Object" : value}`,
        },
        position: { x: column * 300, y: yOffset },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: {
          ...nodeStyle,
          padding: "10px",
          borderRadius: "5px",
          fontWeight: "bold",
          width: "150px",
          textAlign: "center",
        },
      });

      // Create edges between parent and child nodes
      if (parentId) {
        edges.push({ id: `e-${parentId}-${id}`, source: parentId, target: id });
      }

      yOffset += 100;

      if (value && typeof value === "object") {
        traverseJson(
          value as Record<string, unknown>,
          id,
          depth + 1,
          column + 1,
          yOffset
        );
      }
    });
  };

  traverseJson(data); // Start parsing the JSON data

  return (
    <ReactFlowProvider>
      <div className="visualizer" style={{ height: "100vh", width: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          minZoom={0.5}
          maxZoom={2}
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default JsonVisualizer;
