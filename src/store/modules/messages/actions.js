import { apiSvc } from "../../../services";

const resource = "messages";

export default {
  fetchMessages({ commit }) {
    apiSvc
      .get(resource)
      .then((response) => {
        commit("SET_MESSAGE", response.data);
      })
      .catch((error) => {
        console.log(
          "There was an error fetching message method: " + error.message
        );
      });
  },
  fetchMessage({ commit }, data) {
    apiSvc
      .getById(resource, data.id)
      .then((response) => {
        commit("SET_MESSAGE", response.data);
      })
      .catch((error) => {
        console.log(
          "There was an error fetching message method: " + error.message
        );
      });
  },
  createMessage({ commit }, message) {
    apiSvc
      .post(resource, message)
      .then(() => {
        commit("ADD_NEW_MESSAGE", message);
      })
      .catch((error) => {
        console.log(
          "There was a problem creating message method: " + error.message
        );
      });
  },
  deleteMessage({ commit }, message) {
    apiSvc.delete(resource, message).then(() => {
      commit("DELETE_MESSAGE", message);
    });
  },
  updateMessage({ commit }, message) {
    apiSvc
      .update(resource, message)
      .then(() => {
        commit("UPDATE_MESSAGE", message);
      })
      .catch((error) => {
        console.log("there was an error updating message: " + error.message);
      });
  },
  async getMessagesByClient({ commit }, messageload) {
    await this.dispatch(
      "index",
      "messages/clients/" + messageload.clientId,
      messageload
    )
      .then((data) => {
        commit("SET_MESSAGES", JSON.parse(data));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async getMyContactList({ commit }, myself) {
    let response = null;

    try {
      response = await apiSvc.post("messages/getMyContactList", {
        ...myself,
      });

      const { body } = response.data;
      commit("SET_CONTACT_LIST", body);

      // mutatting direct into the Chat Store
      await this.commit("setParticipants", JSON.parse(body), { root: true });
    } catch (e) {
      response == {};
    }
  },
  async getConversationByContactId({ commit }, participants) {
    const requestData = {
      method: "post",
      url: "messages/getConversationByContactId",
      data: participants,
    };
    apiSvc
      .customRequest(requestData)
      .then((response) => {
        commit("SET_MESSAGES", response.data.body);

        // mutatting direct into the Chat Store
        this.commit("setMessages", JSON.parse(response.data.body), {
          root: true,
        });
        // this.dispatch("addMessages", JSON.parse(response.data.body), {
        //   root: true,
        // });
      })
      .catch((error) => {
        console.log(
          "There was an error fetching message method: " + error.message
        );
      });
  },
  async setMyself({ commit }, myself) {
    commit("SET_MYSELF", myself);

    // mutatting direct into the Chat Store
    this.commit("setMyself", myself, { root: true });
  },
  // eslint-disable-next-line no-unused-vars
  async getNrOfNewMessages({ commit }, id) {
    let response = null;
    try {
      response = await apiSvc.post("messages/getNrOfNewMessages", {
        ...id,
      });

      const { NrOfNewMessages } = JSON.parse(response.data.body);

      // mutatting direct into the Chat Store
      await this.commit("setNrOfNewMessages", JSON.parse(NrOfNewMessages), {
        root: true,
      });
    } catch (e) {
      response == {};
    }
  },
  // eslint-disable-next-line no-unused-vars
  async getNrOfNewMessagesByContactId({ commit }, conversation) {
    let response = null;
    try {
      response = await apiSvc.post("messages/getNrOfNewMessagesByContactId", {
        ...conversation,
      });
      console.log("nrMessages.body", JSON.parse(response.data.body));
      const { NrOfNewMessages } = JSON.parse(response.data.body);
      console.log("NrOfNewMessages from api result", NrOfNewMessages);
      // mutatting direct into the Chat Store
      await this.commit(
        "setNrOfNewMessagesFromContact",
        JSON.parse(NrOfNewMessages),
        {
          root: true,
        }
      );
    } catch (e) {
      response == {};
    }
  },
};
