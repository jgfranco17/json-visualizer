"use client";
import { useState, useRef } from "react";
import FileUploader from "../components/FileUploader";
import JsonVisualizer from "../components/JsonVisualizer";
import "../styles/styles.css";

const Page: React.FC = () => {
  const [jsonData, setJsonData] = useState<Record<string, unknown> | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (data: Record<string, unknown>) => {
    setJsonData(data);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  return (
    <div className="container">
      <h1>JSON Visualizer</h1>
      <button onClick={handleButtonClick}>Upload JSON</button>
      <FileUploader ref={fileInputRef} onUpload={handleUpload} />
      {jsonData ? (
        <div>
          <h2>Visualization</h2>
          <JsonVisualizer data={jsonData} />
        </div>
      ) : (
        <p>No data to visualize</p>
      )}
    </div>
  );
};

export default Page;
