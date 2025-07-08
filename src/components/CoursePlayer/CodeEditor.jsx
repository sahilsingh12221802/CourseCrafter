import { useState } from "react";

export function CodeEditor({ challenge, language = "javascript" }) {
  const [code, setCode] = useState(challenge.starterCode || "");

  return (
    <div className="h-full">
      <div className="p-4 border-b">
        <h4 className="font-medium">{challenge.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
      </div>
      <div className="h-[300px]">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full font-mono p-4 text-sm"
          spellCheck="false"
        />
      </div>
      <div className="p-4 border-t">
        <Button className="mr-2">Run Code</Button>
        <Button variant="outline">Show Solution</Button>
      </div>
    </div>
  );
}