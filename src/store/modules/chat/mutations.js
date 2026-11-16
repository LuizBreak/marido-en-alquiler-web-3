import { DateTime } from "luxon";

export default {
  resetChat(state) {
    state.messages = []; state.participants = []; state.myself = {}; state.activeChat = null; state.nrOfNewMessages = 0;
  },
  receiveChatMessage(state, incoming) {
    incoming = { ...incoming, myself: String(incoming.participantId) === String(state.myself.id) };
    const existing = state.messages.find(message =>
      (incoming.messageId && String(message.messageId) === String(incoming.messageId)) ||
      (incoming.clientMessageId && message.clientMessageId === incoming.clientMessageId && String(message.participantId) === String(incoming.participantId)));
    if (existing) Object.assign(existing, incoming);
    else state.messages.push(incoming);
  },
  mergeConversation(state, { messages, myself, contactId }) {
    const belongs = message => (String(message.participantId) === String(myself) && String(message.toId) === String(contactId)) ||
      (String(message.participantId) === String(contactId) && String(message.toId) === String(myself));
    const newest = Math.max(0, ...messages.map(message => Number(message.messageId) || 0));
    const pending = state.messages.filter(message => belongs(message) && (!message.messageId || Number(message.messageId) > newest));
    state.messages = messages.map(message => ({ ...message, myself: String(message.participantId) === String(myself) }));
    for (const message of pending) {
      const found = state.messages.some(item => item.messageId && String(item.messageId) === String(message.messageId));
      if (!found) state.messages.push(message);
    }
  },
  setMessageDelivery(state, delivery) {
    const message = state.messages.find(item => item.clientMessageId === delivery.clientMessageId);
    if (message) Object.assign(message, delivery);
  },
  newMessage: (state, message) => {
    try {
      message.timestamp = message.timestamp.toISO();
    } catch (error) {
      // if date already in ISO, not need to convert it
      console.log("No need to convert toISO", message.timestamp);
    }
    message.myself = message.participantId === state.myself.id;
    state.messages = [...state.messages, message];
  },
  setParticipants: (state, participants) => {
    state.participants = participants;
  },
  setMyself: (state, myself) => {
    state.myself = myself;
  },
setMessages: (state, messages) => {
  state.messages = messages.map((message) => {

    // Normalize timestamp
    if (message.timestamp) {

      if (typeof message.timestamp === "object" && message.timestamp.ts) {
        // Firestore / custom object with ts
        message.timestamp = DateTime.fromMillis(message.timestamp.ts).toISO();

      } else if (typeof message.timestamp === "string") {
        // ISO string
        message.timestamp = DateTime.fromISO(message.timestamp).toISO();

      } else if (typeof message.timestamp === "number") {
        // timestamp in millis
        message.timestamp = DateTime.fromMillis(message.timestamp).toISO();

      } else {
        message.timestamp = DateTime.local().toISO();
      }

    } else {
      message.timestamp = DateTime.local().toISO();
    }

    // Set myself flag
    if (!("myself" in message)) {
      message.myself = message.participantId === state.myself.id;
    }

    return message;
  });
},
  setChatTitle: (state, title) => {
    state.chatTitle = title;
  },
  setPlaceholder: (state, placeholder) => {
    state.placeholder = placeholder;
  },
  newParticipants: (state, participants) => {
    try {
      state.participants = [...state.participants, participants];
    } catch (error) {
      console.log("error adding  participants", [error, participants]);
    }
  },
  setActiveChat: (state, activeChat) => {
    state.activeChat = activeChat;
  },
  setNrOfNewMessages: (state, nrOfNewMessages) => {
    state.nrOfNewMessages = nrOfNewMessages;
  },
};
