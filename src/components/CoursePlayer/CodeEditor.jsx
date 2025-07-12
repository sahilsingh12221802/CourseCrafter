import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";


const CodeEditor = ({
  initialCode,
  language,
  onRun,
  isLoading,
  result,
  error,
  placeholder,
}) => {
  const [code, setCode] = useState(initialCode || "");

  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto my-6">
        <CardContent>
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-10 w-24" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto my-6">
      <CardContent>
        <label htmlFor="code-editor" className="block text-lg font-semibold mb-2">
          Code Editor ({language})
        </label>
        <textarea
          id="code-editor"
          className="w-full h-48 font-mono text-sm rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y transition"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          aria-label={`Code editor for ${language}`}
        />
        <div className="flex items-center gap-4 mt-4">
          <Button onClick={() => onRun(code)} aria-label="Run code" variant="default">
            Run
          </Button>
          {error && (
            <span className="text-red-600 text-sm" role="alert">
              {error}
            </span>
          )}
        </div>
        {result && (
          <div className="mt-6 bg-gray-100 rounded p-3 font-mono text-sm">
            <strong>Output:</strong>
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

CodeEditor.propTypes = {
  initialCode: PropTypes.string,
  language: PropTypes.string,
  onRun: PropTypes.func,
  isLoading: PropTypes.bool,
  result: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

CodeEditor.defaultProps = {
  initialCode: "",
  language: "JavaScript",
  onRun: () => {},
  isLoading: false,
  result: "",
  error: "",
  placeholder: "// Write your code here...",
};

export default CodeEditor;
