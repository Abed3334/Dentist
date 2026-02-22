
import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ConversationList from './components/ConversationList';
import ChatView from './components/ChatView';
import { conversations as mockConversations } from '../../../mocks/messages';

export default function MessagesPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleSelectConversation = (conv: any) => {
    setActiveConversation(conv);
    setShowChat(true);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unread: 0 } : c))
    );
  };

  const handleBack = () => {
    setShowChat(false);
  };

  const handleMarkResolved = (id: number) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'resolved' } : c))
    );
    if (activeConversation?.id === id) {
      setActiveConversation((prev: any) => prev ? { ...prev, status: 'resolved' } : prev);
    }
  };

  const handleAssign = (id: number, staff: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, assignedTo: staff } : c))
    );
    if (activeConversation?.id === id) {
      setActiveConversation((prev: any) => prev ? { ...prev, assignedTo: staff } : prev);
    }
  };

  const handleSendMessage = (id: number, text: string) => {
    const newMsg = {
      id: Date.now(),
      sender: 'staff',
      text,
      time: new Date().toISOString(),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: text, lastMessageTime: newMsg.time }
          : c
      )
    );
    if (activeConversation?.id === id) {
      setActiveConversation((prev: any) =>
        prev ? { ...prev, messages: [...prev.messages, newMsg], lastMessage: text, lastMessageTime: newMsg.time } : prev
      );
    }
  };

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 h-[calc(100vh-73px)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F3B]">Messages</h1>
            <p className="text-sm text-[#6B7280]">
              {totalUnread > 0 ? `${totalUnread} unread conversations` : 'All caught up!'}
            </p>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden flex" style={{ height: 'calc(100% - 72px)' }}>
          {/* Left: Conversation List */}
          <div
            className={`w-full lg:w-[380px] lg:min-w-[340px] border-r border-[#E5E7EB] flex-shrink-0 ${
              showChat ? 'hidden lg:flex lg:flex-col' : 'flex flex-col'
            }`}
          >
            <ConversationList
              conversations={conversations}
              activeId={activeConversation?.id ?? null}
              onSelect={handleSelectConversation}
              filter={filter}
              onFilterChange={setFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Right: Chat View */}
          <div
            className={`flex-1 flex flex-col ${
              showChat ? 'flex' : 'hidden lg:flex'
            }`}
          >
            {activeConversation ? (
              <ChatView
                conversation={activeConversation}
                onBack={handleBack}
                onMarkResolved={handleMarkResolved}
                onAssign={handleAssign}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[#6B7280]">
                <div className="w-20 h-20 bg-[#F0FDF9] rounded-full flex items-center justify-center mb-4">
                  <i className="ri-message-3-line text-3xl text-[#0F766E]"></i>
                </div>
                <h3 className="text-lg font-semibold text-[#0B1F3B] mb-1">Select a conversation</h3>
                <p className="text-sm">Choose a conversation from the list to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
