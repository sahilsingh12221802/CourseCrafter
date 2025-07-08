// src/components/CoursePlayer/Quiz.jsx
export function Quiz({ questions }) {
  return (
    <div className="p-4">
      {questions?.map((q, i) => (
        <div key={i} className="mb-6">
          <h4 className="font-medium mb-2">{q.question}</h4>
          <div className="space-y-2">
            {q.options.map((opt, j) => (
              <div key={j} className="flex items-center">
                <input type="radio" name={`q${i}`} className="mr-2" />
                <label>{opt}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}