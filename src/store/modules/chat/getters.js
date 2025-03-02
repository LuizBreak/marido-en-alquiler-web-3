import { DateTime } from "luxon";

export default {
  getParticipantById: (state) => (id) => {
    let curr_participant = {
      name: "unknown user",
      id: 0,
      profilePicture: "",
    };
    state.participants.forEach((participant) => {
      // console.log("participantId", [id, participant.id]);
      if (participant.id === id) {
        curr_participant = participant;
      }
    });
    // console.log("curr_participant found", [id, curr_participant]);
    return curr_participant;
  },
  messages: (state) => {
    let messages = [];
    state.messages.forEach((message) => {
      let newMessage = { ...message };
      try {
        newMessage.timestamp = DateTime.fromISO(newMessage.timestamp);
      } catch (error) {
        console.log("no need to convert to ISO");
      }
      messages.push(newMessage);
    });
    return messages;
  },
  myself: (state) => {
    return state.myself;
  },
  chatTitle: (state) => {
    return state.chatTitle;
  },
  participants: (state) => {
    return state.participants;
  },
  placeholder: (state) => {
    return state.placeholder;
  },
  activeChat: (state) => {
    return state.activeChat;
  },
  nrOfNewMessages: (state) => {
    return state.nrOfNewMessages;
  },
};
