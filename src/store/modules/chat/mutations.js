import { DateTime } from "luxon";

export default {
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
