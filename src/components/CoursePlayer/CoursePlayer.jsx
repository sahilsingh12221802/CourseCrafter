// src/components/CoursePlayer/CoursePlayer.jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { VideoLesson } from "./VideoLesson";
import { CodeEditor } from "./CodeEditor";
import { Quiz } from "./Quiz";
import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, ClipboardList, Code } from "lucide-react";
import { Button } from "../ui/button";

export function CoursePlayer({ currentModule }) {
  const [activeTab, setActiveTab] = useState("lesson");

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Module Title */}
      <div className="p-4 border-b">
        <h3 className="font-bold text-lg">{currentModule.title}</h3>
        <p className="text-sm text-gray-500">
          {currentModule.duration} • {currentModule.type}
        </p>
      </div>

      {/* Interactive Content Tabs */}
      <Tabs value={activeTab} className="min-h-[400px]">
        <TabsList className="grid grid-cols-3 rounded-none">
          <TabsTrigger value="lesson" className="py-3">
            <BookOpen className="mr-2 h-4 w-4" /> Lesson
          </TabsTrigger>
          <TabsTrigger value="practice" className="py-3">
            <Code className="mr-2 h-4 w-4" /> Practice
          </TabsTrigger>
          <TabsTrigger value="quiz" className="py-3">
            <ClipboardList className="mr-2 h-4 w-4" /> Quiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lesson" className="p-0">
          <VideoLesson content={currentModule.videoContent} />
        </TabsContent>
        
        <TabsContent value="practice" className="p-0">
          <CodeEditor 
            challenge={currentModule.codeChallenge}
            language={currentModule.language}
          />
        </TabsContent>
        
        <TabsContent value="quiz" className="p-0">
          <Quiz questions={currentModule.quizQuestions} />
        </TabsContent>
      </Tabs>

      {/* Navigation Footer */}
      <div className="border-t p-4 bg-gray-50 flex justify-between">
        <Button variant="outline" disabled={!currentModule.hasPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button>
          <CheckCircle className="mr-2 h-4 w-4" /> Mark Complete
        </Button>
        <Button variant="outline" disabled={!currentModule.hasNext}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}