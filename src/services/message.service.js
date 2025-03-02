import store from "../store/index";
import { EmailService } from "../services/email.services";
import { apiSvc } from "../services";

export class Message {
  constructor(subject, fromId, toId, quoteId, messageBody) {
    this.subject = subject || "Marido-en-alquiler: Notificacion";
    this.fromId = fromId || "";
    this.toId = toId || "";
    this.quoteId = quoteId || "";
    this.messageBody = messageBody || "";
    this.wasRead = false;
  }
  // "[ Properties ]"
  IsValid = true;

  isNumber(value) {
    return typeof value === "number" && isFinite(value);
  }

  // [ Public & Private Methods ]
  validate() {
    if (this.messageBody === "") {
      this.IsValid = false;
    }
    return this.IsValid;
  }
  add(notifyTarget, msgAttributes) {
    const ds = {
      fromId: msgAttributes.fromId,
      toId: msgAttributes.toId,
      quoteId: msgAttributes.quoteId,
      subject: msgAttributes.subject,
      messageBody: msgAttributes.messageBody,
      wasRead: msgAttributes.wasRead,
      msgType: msgAttributes.msgType,
      msgAsset: msgAttributes.msgAsset,
      updatedAt: msgAttributes.updatedAt,
    };
    store
      .dispatch("messages/createMessage", ds, { root: true })
      .then(() => {
        if (notifyTarget) {
          this.notify(msgAttributes);
        }
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  notify(msgAttributes) {
    try {
      EmailService.send(msgAttributes);
    } catch (error) {
      console.log(error);
    }
  }
  update() {
    console.log("update.enter ");
    throw new Error("Not Implemented");
  }
  delete(id) {
    console.log("delete.enter " + id);
    throw new Error("Not Implemented");
  }
  getAll() {
    console.log("getAll.enter ");
    throw new Error("Not Implemented");
  }
  getById(id) {
    console.log("delgetByIdete.enter " + id);
    throw new Error("Not Implemented");
  }
  async getMyContactList(myself) {
    await store
      .dispatch("messages/getMyContactList", {
        myself,
      })
      .catch(() => {
        console.log("Error refreshing contact list");
      });
  }
  async getConversationByContactId(participants) {
    // myself: participants.myself,
    // contactId: participants.contactId,

    await store
      .dispatch("messages/getConversationByContactId", {
        ...participants,
      })
      .catch(() => {
        console.log("Error refreshing conversation");
      });
  }
  async setMyself(myself) {
    await store.dispatch("messages/setMyself", {
      ...myself,
    });
  }
  async setActiveChat(id) {
    await store.commit("setActiveChat", {
      id,
    });
  }
  async getByProjectId(id) {
    console.log("svc.getByProjectId.enter " + id);
    await store
      .dispatch("messages/getByProjectId", {
        clientId: id,
      })
      .catch(() => {
        console.log("Error refreshing message list");
      });
  }
  async getNrOfNewMessages(id) {
    await store
      .dispatch("messages/getNrOfNewMessages", {
        id: id,
      })
      .catch(() => {
        console.log("Error refreshing Nr of new messages");
      });
  }
  async getNrOfNewMessagesByContactIdxxx(fromId, toId) {
    // console.log("id.svc", [fromId, toId]);
    await store
      .dispatch("messages/getNrOfNewMessagesByContactId", {
        fromId: fromId,
        toId: toId,
      })
      .catch(() => {
        console.log("Error refreshing Nr of new messages");
      });
  }
  async getNrOfNewMessagesByContactId(fromId, toId) {
    try {
      const response = await apiSvc.post(
        "messages/getNrOfNewMessagesByContactId",
        {
          fromId,
          toId,
        }
      );
      const { NrOfNewMessages } = JSON.parse(response.data.body);
      return NrOfNewMessages;
    } catch (e) {
      console.log(e);
    }
  }
  async SetMessagesAsRead(fromId, toId) {
    // console.log("SetMessagesAsRead", [fromId, toId]);
    try {
      const response = await apiSvc.post("messages/setMsgsAsReadByContactId", {
        fromId,
        toId,
      });
      const { rowCount } = JSON.parse(response.data.body);
      console.log("rowCount", [rowCount, response.data.body]);
    } catch (e) {
      console.log(e);
    }
  }
  hasMessages() {
    return store.getters["messages/hasMessages"];
  }
  messages() {
    return store.getters["messages/messages"];
  }
  #toJson() {
    return {
      fromId: this.fromId,
      toId: this.toId,
      quoteId: this.quoteId,
      subject: this.subject,
      messageBody: this.messageBody,
      wasRead: this.wasRead,
    };
  }
}
