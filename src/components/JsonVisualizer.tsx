import React from "react";
import ReactFlow, { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

interface JsonVisualizerProps {
  data: Record<string, unknown>;
}

const JsonVisualizer: React.FC<JsonVisualizerProps> = ({ data }) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const traverseJson = (
    obj: Record<string, unknown>,
    parentId: string | null = null,
    depth: number = 0
  ) => {
    Object.entries(obj).forEach(([key, value], index) => {
      const id = `${parentId ? `${parentId}-` : ""}${key}-${depth}-${index}`;

      // Add a node for the current key
      nodes.push({
        id,
        data: { label: key },
        position: { x: index * 150, y: depth * 100 },
      });

      // If there's a parent, create an edge connecting the parent to this node
      if (parentId) {
        edges.push({ id: `e-${parentId}-${id}`, source: parentId, target: id });
      }

      // Recursively traverse if the value is an object or array
      if (value && typeof value === "object") {
        traverseJson(value as Record<string, unknown>, id, depth + 1);
      }
    });
  };

  traverseJson(data);

  return (
    <div className="visualizer">
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
};

export default JsonVisualizer;
