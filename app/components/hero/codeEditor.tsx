"use client";

import { useState, useEffect } from "react";
import { FiCode } from "react-icons/fi";
import Reveal from "../reveal";

const CodeEditor = () => {
  const [activeCode, setActiveCode] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  const codeSnippets = [
    {
      language: "React",
      code: `function Welcome() {
  return (
    <div className="animate-fade-in">
      <h1>Hello World!</h1>
      <button onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}`,
      comment: "// Building interactive UIs"
    },
    {
      language: "Node.js",
      code: `const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  res.json({ 
    success: true,
    data: getDataFromDB() 
  });
});

app.listen(3000, () => 
  console.log('Server running'));
`,
      comment: "// Creating robust APIs"
    },
    {
      language: "TypeScript",
      code: `interface User {
  id: string;
  name: string;
  email: string;
}

function sendEmail(user: User): void {
  if (validateEmail(user.email)) {
    mailService.send(user.email);
  }
}`,
      comment: "// Type-safe development"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCode((prev) => (prev + 1) % codeSnippets.length);
      setTypingIndex(0);
      setTypingText("");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typingIndex < codeSnippets[activeCode].code.length) {
      const timeout = setTimeout(() => {
        setTypingText(prev => prev + codeSnippets[activeCode].code[typingIndex]);
        setTypingIndex(prev => prev + 1);
      }, Math.random() * 30);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, activeCode]);

  return (
    <div className="hidden md:block w-full max-w-md h-[430px] relative">
      <Reveal>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl rotate-1 transition-all duration-500"></div>
        <div className="relative h-full bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden">
          {/* Editor Header */}
          <div className="flex items-center px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400">
              {codeSnippets[activeCode].language}.js
            </div>
            <FiCode className="ml-auto text-lg text-purple-400" />
          </div>
          
          {/* Code Content */}
          <div className="p-4 font-mono text-sm">
            <div className="text-purple-400 mb-2">
              {codeSnippets[activeCode].comment}
            </div>
            <pre className="text-gray-300 overflow-hidden">
              <code>{typingText}</code>
            </pre>
          </div>
          
          {/* Language Indicator */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {codeSnippets.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCode(index);
                  setTypingIndex(0);
                  setTypingText("");
                }}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  index === activeCode
                    ? "bg-purple-500 text-white"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {codeSnippets[index].language}
              </button>
            ))}
          </div>
          
          {/* Animated Cursor */}
          {typingIndex < codeSnippets[activeCode].code.length && (
            <div className="absolute bottom-[120px] left-[130px] w-2 h-6 bg-purple-400 animate-pulse"></div>
          )}
        </div>
      </Reveal>
    </div>
  );
};

export default CodeEditor;