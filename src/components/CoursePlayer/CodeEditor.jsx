import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Editor from '@monaco-editor/react';
import { Play, RotateCw, Check, ChevronDown, Terminal, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTheme } from '../../lib/hooks/useTheme';

/**
 * CodeEditor - Interactive coding environment component
 * @param {Object} props
 * @param {Object} props.lesson - Coding lesson data
 * @param {Function} props.onComplete - Callback when exercise is completed
 */
export const CodeEditor = ({ lesson, onComplete }) => {
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const [code, setCode] = useState(lesson.initialCode || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('instructions');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [language, setLanguage] = useState(lesson.language || 'javascript');
  const [isCompleted, setIsCompleted] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const containerRef = useRef(null);

  // Available languages with syntax highlighting support
  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
  ];

  // Handle editor mount
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // Add custom theme
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e2d',
      },
    });
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen?.();
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Run code
  const runCode = () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    setActiveTab('output');

    // Simulate code execution (in a real app, this would call an API or Web Worker)
    setTimeout(() => {
      try {
        // In a real implementation, you'd use a safe execution environment
        let result = '';
        if (language === 'javascript') {
          // Capture console.log outputs
          const originalConsoleLog = console.log;
          console.log = (...args) => {
            result += args.join(' ') + '\n';
          };
          // Use Function constructor for safer execution
          new Function(code)();
          console.log = originalConsoleLog;
        }

        setOutput(prev => prev + result + 'Code executed successfully.\n');
        
        // Simple test validation (would be more robust in production)
        if (lesson.expectedOutput && result.includes(lesson.expectedOutput)) {
          setTestResults([{ passed: true, message: 'Output matches expected result' }]);
        } else {
          setTestResults([{ passed: false, message: 'Output does not match expected result' }]);
        }
      } catch (error) {
        setOutput(prev => prev + `Error: ${error.message}\n`);
        setTestResults([{ passed: false, message: `Runtime error: ${error.message}` }]);
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  // Check if solution is correct
  const checkSolution = () => {
    runCode();
    // In a real app, this would run actual tests
    const passed = testResults.every(test => test.passed);
    if (passed) {
      setIsCompleted(true);
      onComplete?.();
    }
  };

  // Reset code to initial state
  const resetCode = () => {
    setCode(lesson.initialCode || '');
    setOutput('');
    setTestResults([]);
    setIsCompleted(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col h-full bg-gray-50 dark:bg-gray-900 ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : 'rounded-lg border border-gray-200 dark:border-gray-700'}`}
    >
      {/* Editor Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-gray-500 hover:text-primary"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor Area */}
        <div className={`${activeTab === 'instructions' ? 'hidden md:block md:w-2/3' : 'w-full'} h-full`}>
          <Editor
            height="100%"
            language={language}
            theme={theme === 'dark' ? 'custom-dark' : 'light'}
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
              padding: { top: 15 },
            }}
          />
        </div>

        {/* Sidebar */}
        <div className={`${activeTab === 'instructions' ? 'w-full md:w-1/3' : 'hidden'} border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col h-full overflow-auto`}>
          <Tabs defaultValue="instructions" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
            </TabsList>

            <TabsContent value="instructions" className="flex-1 overflow-y-auto p-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: lesson.instructions }} />
              </div>
            </TabsContent>

            <TabsContent value="tests" className="flex-1 overflow-y-auto p-4">
              {lesson.tests ? (
                <div className="space-y-4">
                  <h4 className="font-medium">Test Cases</h4>
                  <ul className="space-y-3">
                    {lesson.tests.map((test, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`flex-shrink-0 mt-1 mr-2 ${testResults[index]?.passed ? 'text-green-500' : 'text-gray-400'}`}>
                          {testResults[index]?.passed ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-gray-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm">{test.description}</p>
                          {testResults[index]?.message && (
                            <p className={`text-xs mt-1 ${testResults[index]?.passed ? 'text-green-500' : 'text-red-500'}`}>
                              {testResults[index].message}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500">No test cases provided for this exercise.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Output Console */}
        {activeTab === 'output' && (
          <div className="w-full h-1/3 md:h-full border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
            <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Output</span>
            </div>
            <pre className="flex-1 p-4 overflow-auto bg-gray-50 dark:bg-gray-900 text-sm font-mono whitespace-pre-wrap">
              {output || 'No output yet. Run your code to see results.'}
            </pre>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab(activeTab === 'instructions' ? 'output' : 'instructions')}
            className="flex items-center"
          >
            {activeTab === 'instructions' ? (
              <>
                <Terminal className="h-4 w-4 mr-2" />
                Show Output
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show Instructions
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetCode}
            disabled={isRunning}
          >
            <RotateCw className="h-4 w-4 mr-2" />
            Reset
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            Run Code
          </Button>

          <Button
            variant={isCompleted ? 'default' : 'outline'}
            size="sm"
            onClick={checkSolution}
            disabled={isRunning || isCompleted}
          >
            {isCompleted ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            {isCompleted ? 'Completed' : 'Check Solution'}
          </Button>
        </div>
      </div>
    </div>
  );
};

CodeEditor.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['coding']).isRequired,
    language: PropTypes.string,
    initialCode: PropTypes.string,
    instructions: PropTypes.string.isRequired,
    expectedOutput: PropTypes.string,
    tests: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        code: PropTypes.string
      })
    )
  }).isRequired,
  onComplete: PropTypes.func
};

export default CodeEditor;