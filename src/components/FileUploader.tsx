import React, { forwardRef } from "react";

interface FileUploaderProps {
  onUpload: (data: Record<string, unknown>) => void;
}

const FileUploader = forwardRef<HTMLInputElement, FileUploaderProps>(
  ({ onUpload }, ref) => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const result = e.target?.result;
          if (typeof result === "string") {
            const parsedJson = JSON.parse(result);
            onUpload(parsedJson);
          } else {
            throw new Error("Unexpected file format.");
          }
        } catch (err) {
          console.error("Invalid JSON file:", err);
        }
      };
      reader.readAsText(file);
    };

    return (
      <div>
        <input
          type="file"
          accept=".json"
          ref={ref}
          onChange={handleFileUpload}
          style={{ display: "none" }} // Keep input hidden
        />
      </div>
    );
  }
);

FileUploader.displayName = "FileUploader";

export default FileUploader;
