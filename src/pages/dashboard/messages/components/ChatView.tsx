import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { quickReplyTemplates, staffMembers } from '../../../../mocks/messages';

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  patient: { id: number; name: string; avatar: string };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  tags: string[];
  status: string;
  assignedTo: string | null;
  messages: Message[];
}

interface ChatViewProps {
  conversation: Conversation;
  onBack: () => void;
  onMarkResolved: (id: number) => void;
  onAssign: (id: number, staff: string) => void;
  onSendMessage: (id: number, text: string) => void;
}

export default function ChatView({ conversation, onBack, onMarkResolved, onAssign, onSendMessage }: ChatViewProps) {
  const [messageText, setMessageText] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const { showToast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  const handleSend = () => {
    if (!messageText.trim()) return;
    onSendMessage(conversation.id, messageText.trim());
    setMessageText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTemplateSelect = (text: string) => {
    setMessageText(text);
    setShowTemplates(false);
  };

  const formatMessageTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const groupedMessages: { date: string; messages: Message[] }[] = [];
  conversation.messages.forEach((msg) => {
    const dateKey = new Date(msg.time).toDateString();
    const existing = groupedMessages.find((g) => g.date === dateKey);
    if (existing) {
      existing.messages.push(msg);
    } else {
      groupedMessages.push({ date: dateKey, messages: [msg] });
    }
  });

  return (
    <div className="flex flex-col h-full relative">
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-[#E5E7EB] bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="lg:hidden p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line text-xl text-[#111827]"></i>
          </button>
          <img
            src={conversation.patient.avatar}
            alt={conversation.patient.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-sm font-bold text-[#111827]">{conversation.patient.name}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${conversation.status === 'resolved' ? 'text-[#0F766E]' : 'text-[#6B7280]'}`}>
                {conversation.status === 'resolved' ? 'Resolved' : 'Open'}
              </span>
              {conversation.assignedTo && (
                <span className="text-xs text-[#6B7280]">• Assigned to {conversation.assignedTo}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Assign Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowAssignDropdown(!showAssignDropdown); setShowMoreMenu(false); }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 border-2 border-[#E5E7EB] rounded-lg text-xs font-medium text-[#111827] hover:border-[#0F766E] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-user-settings-line text-sm w-4 h-4 flex items-center justify-center"></i>
              Assign
            </button>
            {showAssignDropdown && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-[#E5E7EB] z-30 py-2">
                {staffMembers.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { onAssign(conversation.id, s.name); setShowAssignDropdown(false); showToast(`Assigned to ${s.name}`); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-[#F0FDF9] transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 bg-[#0B1F3B] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#111827]">{s.name}</p>
                      <p className="text-[10px] text-[#6B7280]">{s.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mark Resolved */}
          {conversation.status !== 'resolved' && (
            <button
              onClick={() => { onMarkResolved(conversation.id); showToast('Marked as resolved'); }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#0F766E] text-white rounded-lg text-xs font-medium hover:bg-[#0B5B54] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-check-double-line text-sm w-4 h-4 flex items-center justify-center"></i>
              Resolve
            </button>
          )}

          {/* More Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setShowMoreMenu(!showMoreMenu); setShowAssignDropdown(false); }}
              className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors cursor-pointer"
              aria-label="More options"
            >
              <i className="ri-more-2-fill text-lg text-[#6B7280]"></i>
            </button>
            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-[#E5E7EB] z-30 py-2">
                <button
                  onClick={() => { showToast('Reminder sent'); setShowMoreMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-[#F0FDF9] transition-colors cursor-pointer"
                >
                  <i className="ri-notification-line text-sm text-[#6B7280] w-4 h-4 flex items-center justify-center"></i>
                  <span className="text-xs text-[#111827]">Send Reminder</span>
                </button>
                <button
                  onClick={() => { setShowAssignDropdown(true); setShowMoreMenu(false); }}
                  className="sm:hidden w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-[#F0FDF9] transition-colors cursor-pointer"
                >
                  <i className="ri-user-settings-line text-sm text-[#6B7280] w-4 h-4 flex items-center justify-center"></i>
                  <span className="text-xs text-[#111827]">Assign to Staff</span>
                </button>
                {conversation.status !== 'resolved' && (
                  <button
                    onClick={() => { onMarkResolved(conversation.id); setShowMoreMenu(false); showToast('Marked as resolved'); }}
                    className="sm:hidden w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-[#F0FDF9] transition-colors cursor-pointer"
                  >
                    <i className="ri-check-double-line text-sm text-[#6B7280] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-xs text-[#111827]">Mark Resolved</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 bg-[#F9FAFB]">
        {groupedMessages.map((group) => (
          <div key={group.date}>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#E5E7EB]"></div>
              <span className="text-xs text-[#6B7280] font-medium whitespace-nowrap">{formatDate(group.messages[0].time)}</span>
              <div className="flex-1 h-px bg-[#E5E7EB]"></div>
            </div>
            {group.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-3 ${msg.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${msg.sender === 'staff' ? 'order-1' : ''}`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'staff'
                        ? 'bg-[#0F766E] text-white rounded-tr-sm'
                        : 'bg-white text-[#111827] shadow-sm border border-[#F3F4F6] rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p className={`text-[10px] text-[#6B7280] mt-1 ${msg.sender === 'staff' ? 'text-right' : ''}`}>
                    {formatMessageTime(msg.time)}
                    {msg.sender === 'staff' && <span className="ml-1.5">You</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Templates */}
      {showTemplates && (
        <div className="border-t border-[#E5E7EB] bg-white px-4 py-3 max-h-48 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#111827]">Quick Replies</span>
            <button onClick={() => setShowTemplates(false)} className="text-[#6B7280] hover:text-[#111827] cursor-pointer">
              <i className="ri-close-line text-sm"></i>
            </button>
          </div>
          <div className="space-y-1.5">
            {quickReplyTemplates.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTemplateSelect(t.text)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F0FDF9] transition-colors cursor-pointer"
              >
                <p className="text-xs font-medium text-[#0F766E]">{t.name}</p>
                <p className="text-[10px] text-[#6B7280] truncate">{t.text}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-[#E5E7EB] bg-white">
        <div className="flex items-end gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => showToast('File attached (mock)')}
              className="p-2 text-[#6B7280] hover:text-[#0F766E] hover:bg-[#F0FDF9] rounded-lg transition-colors cursor-pointer"
              title="Attach file"
            >
              <i className="ri-attachment-2 text-lg w-5 h-5 flex items-center justify-center"></i>
            </button>
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${showTemplates ? 'text-[#0F766E] bg-[#F0FDF9]' : 'text-[#6B7280] hover:text-[#0F766E] hover:bg-[#F0FDF9]'}`}
              title="Quick replies"
            >
              <i className="ri-flashlight-line text-lg w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>

          <div className="flex-1 relative">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors text-sm resize-none"
              style={{ maxHeight: '80px' }}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!messageText.trim()}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              messageText.trim()
                ? 'bg-[#0F766E] text-white hover:bg-[#0B5B54]'
                : 'bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed'
            }`}
          >
            <i className="ri-send-plane-fill text-lg w-5 h-5 flex items-center justify-center"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
