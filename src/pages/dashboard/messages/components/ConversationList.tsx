
import { useState } from 'react';

interface Conversation {
  id: number;
  patient: { id: number; name: string; avatar: string };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  tags: string[];
  status: string;
  assignedTo: string | null;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeId: number | null;
  onSelect: (conv: Conversation) => void;
  filter: string;
  onFilterChange: (f: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function ConversationList({
  conversations,
  activeId,
  onSelect,
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: ConversationListProps) {
  const [tagFilter, setTagFilter] = useState('All');
  const tags = ['All', 'Appointment', 'Billing', 'Urgent', 'Insurance', 'Post-Care'];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Appointment': return 'bg-[#A7F3D0] text-[#0F766E]';
      case 'Billing': return 'bg-[#E0E7FF] text-[#4338CA]';
      case 'Urgent': return 'bg-[#FEE2E2] text-[#DC2626]';
      case 'Insurance': return 'bg-[#FEF3C7] text-[#D97706]';
      case 'Post-Care': return 'bg-[#F3E8FF] text-[#7C3AED]';
      default: return 'bg-[#E5E7EB] text-[#6B7280]';
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filtered = conversations.filter((c) => {
    const matchesSearch =
      c.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'unread' && c.unread > 0) ||
      (filter === 'resolved' && c.status === 'resolved');
    const matchesTag = tagFilter === 'All' || c.tags.includes(tagFilter);
    return matchesSearch && matchesFilter && matchesTag;
  });

  const unreadCount = conversations.filter((c) => c.unread > 0).length;

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b border-[#E5E7EB]">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="ri-search-line text-[#6B7280]"></i>
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="px-4 py-3 border-b border-[#E5E7EB] space-y-2">
        <div className="flex items-center gap-2">
          {['all', 'unread', 'resolved'].map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filter === f
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
              }`}
            >
              {f === 'all' ? 'All' : f === 'unread' ? `Unread (${unreadCount})` : 'Resolved'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                tagFilter === tag
                  ? 'bg-[#0B1F3B] text-white'
                  : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Items */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#6B7280]">
            <i className="ri-chat-off-line text-4xl mb-3"></i>
            <p className="text-sm">No conversations found</p>
          </div>
        ) : (
          filtered.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv)}
              className={`w-full flex items-start gap-3 px-4 py-4 border-b border-[#F3F4F6] transition-all cursor-pointer text-left ${
                activeId === conv.id
                  ? 'bg-[#F0FDF9] border-l-4 border-l-[#0F766E]'
                  : 'hover:bg-[#F9FAFB] border-l-4 border-l-transparent'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={conv.patient.avatar}
                  alt={conv.patient.name}
                  className={`w-11 h-11 rounded-full object-cover ${
                    conv.unread > 0 ? 'ring-2 ring-[#F97316] ring-offset-2' : ''
                  }`}
                />
                {conv.status === 'resolved' && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#0F766E] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white text-[10px]"></i>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${conv.unread > 0 ? 'font-bold text-[#111827]' : 'font-medium text-[#111827]'}`}>
                    {conv.patient.name}
                  </span>
                  <span className="text-xs text-[#6B7280] whitespace-nowrap ml-2">
                    {formatTime(conv.lastMessageTime)}
                  </span>
                </div>
                <p className={`text-xs truncate mb-1.5 ${conv.unread > 0 ? 'text-[#111827] font-medium' : 'text-[#6B7280]'}`}>
                  {conv.lastMessage}
                </p>
                <div className="flex items-center gap-1.5">
                  {conv.tags.map((tag) => (
                    <span key={tag} className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${getTagColor(tag)}`}>
                      {tag}
                    </span>
                  ))}
                  {conv.unread > 0 && (
                    <span className="ml-auto w-5 h-5 bg-[#F97316] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
