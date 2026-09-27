import React, { useState, useRef, useEffect } from 'react';
import { RefillCase } from '../../types/refill';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  ArrowRight, 
  FileText, 
  Check, 
  HelpCircle,
  Clock,
  ShieldAlert
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}

interface RxRelayAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  activeCase: RefillCase | null;
  onApplyActionFromChat?: (actionLabel: string) => void;
}

export const RxRelayAssistant: React.FC<RxRelayAssistantProps> = ({
  isOpen,
  onClose,
  activeCase,
  onApplyActionFromChat
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: activeCase 
        ? `What do you need to know about this refill? I'm currently tracking ${activeCase.patient.name}'s refill for ${activeCase.medication.name} ${activeCase.medication.strength} (${activeCase.referenceNumber}).`
        : `What do you need to know about this refill? Select an active refill from the queue to inspect blockers, draft messages, or review custody.`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // When active case changes, append a brief context notification
  useEffect(() => {
    if (activeCase) {
      setMessages(prev => [
        ...prev,
        {
          id: `case-focus-${Date.now()}`,
          sender: 'assistant',
          text: `What do you need to know about this refill? Currently focused on ${activeCase.medication.name} for ${activeCase.patient.name} (${activeCase.referenceNumber}).`,
          timestamp: 'Just now'
        }
      ]);
    }
  }, [activeCase?.id]);

  const quickPrompts = [
    "Why is this refill blocked?",
    "Who needs to act?",
    "What happens next?",
    "Summarize this case",
    "Show case history",
    "Draft provider message",
    "Draft patient update"
  ];

  const handleSendMessage = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const textLower = userText.toLowerCase();

      if (activeCase && (textLower.includes('why') || textLower.includes('blocked') || textLower.includes('stuck'))) {
        reply = `THIS REFILL IS BLOCKED\n${activeCase.blocker.reason}\n\nOWNER\n${activeCase.owner.name}\n\nNEXT ACTION\n${activeCase.nextBestAction.label}.`;
      } else if (activeCase && (textLower.includes('who') || textLower.includes('act') || textLower.includes('owner'))) {
        reply = `WHO NEEDS TO ACT\n${activeCase.blocker.whoCanResolve}\n\nOWNER\n${activeCase.owner.name} (${activeCase.owner.role})\n\nNEXT ACTION\n${activeCase.nextBestAction.label}.`;
      } else if (activeCase && (textLower.includes('happens next') || textLower.includes('next action') || textLower.includes('next step'))) {
        reply = `WHAT HAPPENS NEXT\n${activeCase.blocker.whatHappensAfter}\n\nRECOMMENDED STEP\n${activeCase.nextBestAction.label}: ${activeCase.nextBestAction.description}`;
      } else if (activeCase && (textLower.includes('summarize') || textLower.includes('summary'))) {
        reply = `CASE SUMMARY: ${activeCase.referenceNumber}\n${activeCase.patient.name} · ${activeCase.medication.name} ${activeCase.medication.strength}\n\nSTATUS: ${activeCase.status} (${activeCase.blocker.badgeLabel})\nWAITING: ${activeCase.ageFormatted}\n\nBLOCKER: ${activeCase.blocker.reason}\n\nNEXT ACTION: ${activeCase.nextBestAction.label}`;
      } else if (activeCase && (textLower.includes('history') || textLower.includes('timeline'))) {
        reply = `CASE HISTORY (${activeCase.timeline.length} recorded events):\n\n` +
          activeCase.timeline.map(t => `• ${t.timestamp}: ${t.title} (${t.actor})`).join('\n');
      } else if (activeCase && (textLower.includes('provider message') || textLower.includes('provider note'))) {
        reply = `PROVIDER MESSAGE DRAFT\nTo: ${activeCase.prescriber.name}\n\n"Refill request for ${activeCase.patient.name} (${activeCase.patient.mrn}) for ${activeCase.medication.name} ${activeCase.medication.strength} # ${activeCase.medication.quantity}. Adherence is ${activeCase.patient.adherenceRate}%. Please review renewal order in EHR."`;
      } else if (activeCase && (textLower.includes('patient update') || textLower.includes('patient message'))) {
        reply = `PATIENT UPDATE (SMS)\nTo: ${activeCase.patient.name} (${activeCase.patient.phone})\n\n"Your refill request is currently being reviewed by your healthcare provider. We’ll update you when the review is complete."`;
      } else {
        reply = activeCase 
          ? `THIS REFILL IS BLOCKED\n${activeCase.blocker.reason}\n\nOWNER\n${activeCase.owner.name}\n\nNEXT ACTION\n${activeCase.nextBestAction.label}.`
          : `Select an active refill from the queue to inspect blockers, draft messages, or review custody.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-950 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold tracking-tight text-white">
                RefillBridge Assistant
              </h3>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">
              Your refill workflow assistant
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Case Context Pill */}
      {activeCase && (
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
            <span className="font-bold text-slate-900 truncate">
              {activeCase.medication.name} · {activeCase.patient.name}
            </span>
          </div>
          <span className="font-mono text-slate-500 text-[11px] font-semibold shrink-0 ml-2">
            {activeCase.referenceNumber}
          </span>
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
              msg.sender === 'user' ? 'bg-slate-950 text-white' : 'bg-teal-50 text-teal-800 border border-teal-200/60'
            }`}>
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-teal-700" />}
            </div>

            <div className={`p-4 rounded-2xl text-xs max-w-[85%] space-y-1.5 shadow-2xs ${
              msg.sender === 'user'
                ? 'bg-slate-950 text-white rounded-tr-xs font-medium'
                : 'bg-slate-50 text-slate-900 border border-slate-200/80 rounded-tl-xs leading-relaxed whitespace-pre-line font-normal'
            }`}>
              <p>{msg.text}</p>
              <span className={`text-[10px] block text-right font-mono ${
                msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 pl-9">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200" />
            <span className="font-medium">Checking refill context...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-6 py-2.5 border-t border-slate-100 bg-slate-50/70">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
          Workflow Prompts
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-lg transition-colors text-left truncate max-w-full shadow-2xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this refill workflow..."
            className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 bg-slate-950 text-white rounded-xl hover:bg-slate-800 disabled:opacity-40 transition-colors shadow-2xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
