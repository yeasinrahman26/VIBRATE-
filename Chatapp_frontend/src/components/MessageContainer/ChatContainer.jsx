import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { formateMessageTime } from "../../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    isMessagesLoading,
    getMessages,
    selectedUser,
    subscribeToMessages,
    unSubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unSubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    unSubscribeFromMessages,
    subscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0)
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex-1 flex  flex-col overflow-auto">
      <ChatHeader />
      {/* messages body */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message?.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            {/* chat image */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message?.senderId === authUser?._id
                      ? authUser?.avatar || "/avatar.png"
                      : selectedUser.avatar || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            {/* time */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formateMessageTime(message.createdAt)}
              </time>
            </div>
            {/* chat bubble */}
            <div
              className={`chat-bubble flex-col ${
                message?.senderId === authUser?._id
                  ? "text-primary-content   bg-primary"
                  : "bg-base-200"
              }
             `}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="send image"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
