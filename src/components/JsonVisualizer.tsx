import React from "react";
import ReactFlow, {
  Node,
  Edge,
  MiniMap,
  Controls,
  ReactFlowProvider,
  Position, // Import Position from reactflow
} from "reactflow";
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
    depth: number = 0,
    column: number = 0, // Controls horizontal layout (left to right)
    yOffset: number = 0 // Controls vertical positioning within each column
  ) => {
    Object.entries(obj).forEach(([key, value], index) => {
      const id = `${parentId ? `${parentId}-` : ""}${key}-${depth}-${index}`;

      // Create node with position and side handles
      nodes.push({
        id,
        data: { label: key },
        position: { x: column * 300, y: yOffset },
        sourcePosition: Position.Right, // Use Position enum for right side
        targetPosition: Position.Left, // Use Position enum for left side
      });

      // Create edges for hierarchical relationships (side to side)
      if (parentId) {
        edges.push({ id: `e-${parentId}-${id}`, source: parentId, target: id });
      }

      yOffset += 100; // Spacing between nodes at the same level

      // Recurse if the value is an object or array
      if (value && typeof value === "object") {
        traverseJson(
          value as Record<string, unknown>,
          id,
          depth + 1,
          column + 1,
          yOffset
        ); // Move to next column
      }
    });
  };

  traverseJson(data); // Start traversing the JSON data

  return (
    <ReactFlowProvider>
      <div className="visualizer" style={{ height: "100vh", width: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          minZoom={0.5} // Optional: Set minimum zoom level
          maxZoom={2} // Optional: Set maximum zoom level
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default JsonVisualizer;
