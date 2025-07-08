import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TopicInput({ onGenerate }) {
  const [config, setConfig] = useState({
    topic: "",
    level: "beginner",
    hoursPerWeek: 5,
    focus: "concepts" // 'concepts' | 'projects' | 'exam'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      ...config,
      // Add study materials template
      modules: generateStudyModules(config)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
      <div>
        <Label>What do you want to master?</Label>
        <Input
          value={config.topic}
          onChange={(e) => setConfig({...config, topic: e.target.value})}
          placeholder="e.g., React hooks, Python data analysis"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Current level</Label>
          <Select 
            value={config.level} 
            onValueChange={(v) => setConfig({...config, level: v})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Weekly study time</Label>
          <Select
            value={config.hoursPerWeek}
            onValueChange={(v) => setConfig({...config, hoursPerWeek: v})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2-5 hours</SelectItem>
              <SelectItem value="5">5-10 hours</SelectItem>
              <SelectItem value="10">10+ hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Craft My Course
      </Button>
    </form>
  );
}

// Helper to generate study modules
function generateStudyModules(config) {
  return [
    {
      title: `${config.topic} Fundamentals`,
      type: "video",
      duration: "45min",
      resources: []
    },
    {
      title: `Hands-on ${config.topic} Lab`,
      type: "interactive",
      duration: "1h",
      resources: []
    }
  ];
}