"use client";

import { useState } from "react";

export default function PracticePage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setMessages( prev => [newMessage, ...prev])
    setNewMessage('')
  }

  return (
    <div className="flex flex-col justify-center items-center gap-8">

      <form action="" className="flex gap-4"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg w-[300px] input"
          placeholder="New message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Send
        </button>
      </form>

      <div className='flex flex-col gap-4 px-20 w-full'>
        {messages.map(message => (
          <p key={message}>{message}</p>
        ))}
      </div>
    </div>
  );
}
