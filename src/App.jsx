import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { analyzeMedicine } from './utils/analyzeMedicine';

const App = () => {
  const [phase, setPhase] = useState(1); // Phase 1: Initial Load, Phase 2: Chat Interface
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phase === 1) {
      setPhase(2);
    }
    if (input.trim()) {
      setMessages((prev) => [...prev, { type: 'user', text: input, prompt_type: 'input' }]);
      setInput('');
      setIsThinking(true);
      try {
        const response = await analyzeMedicine(input);
        setIsThinking(false);
        if (response && response.prompt_type === 'medicine') {
          console.log("Response text medicine:", response);
          setMessages((prev) => [
            ...prev,
            { type: 'ai', text: response.medicine_data, prompt_type: 'medicine' },
          ]);
        } else {
          console.log("Response text conversation:", response);
          setMessages((prev) => [
            ...prev,
            { type: 'ai', text: response.conversation_response, prompt_type: 'conversation' },
          ]);
        }
      } catch (error) {
        console.error('Error analyzing medicine:', error);
        setIsThinking(false);
        setMessages((prev) => [
          ...prev,
          { type: 'ai', text: 'Error analyzing the medicine. Please try again.', prompt_type: 'error' },
        ]);
      }
    }
  };

  return (
    <motion.div
      className="w-screen text-white flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: '10rem' }}
    >
      {phase === 1 && (
        <motion.div
          className="text-center flex flex-col items-center justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src="/drugs.png"
            alt="Capsule"
            className="size-18 lg:size-38 mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <h1 className="text-5xl font-extrabold mb-4">AI Medicine Analyzer</h1>
          <p className="text-lg text-gray-400 mb-6">Ask me about any medicine and I’ll break it down for you.</p>
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter medicine name..."
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 mb-4"
              required
            />
            <button
              style={{ marginTop: '10px' }}
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none transition-transform duration-300"
            >
              Analyze
            </button>
          </form>
        </motion.div>
      )}

      {phase === 2 && (
        <motion.div
          className="w-[100%] h-dvh flex flex-col"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          style={{height: '100% !important'}}
        >
          <div className="flex flex-col h-full justify-content-center items-center w-full absolute top-0">
            <motion.img
              src="/drugs.png"
              alt="Logo"
              className="size-24 p-4"
              animate={{ y: [0, -10, 0] }}
            />
            <h6 className="text-sm h-full font-extrabold mb-4">AI Medicine Analyzer</h6>
          </div>
          <div className={`flex flex-col gap-4 flex-1 p-4 w-[90%] self-center mt-18`}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`flex flex-col w-full`}
                style={{ alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {message.type === 'ai' && message.prompt_type === 'medicine' ? (
                  <div className='self-start p-3 rounded-lg bg-gray-700 whitespace-pre-wrap break-words flex flex-col gap-4'>
                    {message.text.name && message.text.description ? (
                      <div>
                        <p className="font-bold">Medicine Name: {message.text.name}</p>
                        <p>{message.text.description}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-bold">Medicine Data:</p>
                        <p>{message.text}</p>
                      </div>
                    )}
                    {message.text.indications && (
                      <div>
                        <p className="font-bold">Indications:</p>
                        <p>{message.text.indications}</p>
                      </div>
                    )}
                    {message.text.mechanismOfAction && (
                      <div>
                        <p className="font-bold">Mechanism of Action:</p>
                        <p>{message.text.mechanismOfAction}</p>
                      </div>
                    )}
                    {message.text.administrationRoute && (
                      <div>
                        <p className="font-bold">Administration Route:</p>
                        <p>{message.text.administrationRoute}</p>
                      </div>
                    )}
                    {message.text.storage && (
                      <div>
                        <p className="font-bold">Storage:</p>
                        <p>{message.text.storage}</p>
                      </div>
                    )}
                    {message.text.overdose && (
                      <div>
                        <p className="font-bold">Overdose:</p>
                        <p>{message.text.overdose}</p>
                      </div>
                    )}
                    {message.text.precautions && (
                      <div>
                        <p className="font-bold">Precautions:</p>
                        <p>{message.text.precautions}</p>
                      </div>
                    )}
                    {message.text.adverseReactions && (
                      <div>
                        <p className="font-bold">Adverse Reactions:</p>
                        <p>{message.text.adverseReactions}</p>
                      </div>
                    )}
                  </div>
                ) : message.type === 'ai' && message.prompt_type === 'conversation' ? (
                  <div className='w-fit p-3 rounded-lg bg-gray-700 text-white self-start shadow-md  whitespace-pre-wrap break-words'>{message.text}</div>
                ) : (
                  <div className='w-fit p-3 rounded-lg bg-blue-700 text-white self-end shadow-md  whitespace-pre-wrap break-words'>{message.text}</div>
                )}
              </motion.div>
            ))}
            {isThinking && (
              <div className="flex items-center space-x-2 mt-4">
                <img src="/drugs.svg" alt="Thinking" className="w-6 h-6 animate-spin" />
                <span className="text-gray-400">Thinking...</span>
              </div>
            )}
          </div>
          <div className="sticky bottom-0  p-4 w-full">
            {/* Form is now sticky to the bottom of the screen */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (e.shiftKey) {
                      // Allow soft line break
                      return;
                    }
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none transition-transform duration-300"
              >
                Send
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default App;
