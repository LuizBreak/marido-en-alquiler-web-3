<template>
  <div class="col-lg-8 col-md-7">
    <h2 class="h2 card-title">
      <i class="fi-chat-left expand text-primary" aria-hidden="true" />
      Mis Mensajes
    </h2>
    <p class="pt-1">Mantenga todas tus conversaciones grabadas en el sistema</p>
    <div class="row align-items-start">
      <div class="col-sm-6">
        <div class="card card-body shadow-lg pt-4 pb-5">
          <h2 class="h5 pt-2 mb-4">Conversaciones</h2>
          <div
            class="overflow-auto"
            data-simplebar
            data-simplebar-auto-hide="true"
            style="height: 22rem"
          >
            <!-- Loop of Participants -->
            <div
              id="chatItem"
              class="d-flex border-bottom border-top pb-3 mb-3"
              v-for="participant of contactList"
              :key="participant.id"
            >
              <div class="icon-container">
                <img
                  class="participant-thumb mt-4 mx-2"
                  :src="participant.profilePicture"
                  width="25"
                  height="25"
                  borderRadius="50%"
                  alt="user"
                  @error="onImgError()"
                  v-if="true"
                />
                <div
                  class="status-circle"
                  :class="[
                    getStatusForContact(participant.id) == 'On-Line'
                      ? 'logged-in'
                      : 'logged-out',
                  ]"
                ></div>
              </div>

              <div class="ps-2" :id="participant.id" @click="refreshChat">
                <div class="fw-bold mb-1">
                  <div
                    :id="participant.id"
                    class="fw-bold dropdown-item"
                    @click="refreshChat"
                  >
                    {{ participant.name }}
                  </div>
                </div>
                <div class="mx-3 justify-content-between align-items-center">
                  <ul class="list-inline mb-0 fs-xs">
                    <li class="list-inline-item pe-1">
                      <i
                        class="fi-star-filled mt-n1 me-1 fs-base text-warning align-middle"
                      ></i
                      ><b>{{ rating }}</b
                      ><span class="text-muted"
                        >&nbsp;({{ numberOfRatings }})</span
                      >
                    </li>
                    <li class="list-inline-item pe-1">
                      <span
                        class="fs-sm fw-bold"
                        :class="[
                          getStatusForContact(participant.id) == 'On-Line'
                            ? 'text-success'
                            : 'text-danger',
                        ]"
                      >
                        {{ getStatusForContact(participant.id) }}</span
                      >
                    </li>

                    <li class="list-inline-item pe-1">
                      <span
                        v-if="getNrNewMsgForContact(participant.id) > 0"
                        class="d-inline-block badge fw-bold bg-primary border-end pe-2 me-2 mx-3"
                      >
                        {{ getNrNewMsgForContact(participant.id) }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="chat-container mb-3 text-center">
          <Chat
            v-if="visible"
            :participants="participants"
            :myself="myself"
            :messages="messages"
            :chat-title="chatTitle"
            :placeholder="placeholder"
            :colors="colors"
            :border-style="borderStyle"
            :hide-close-button="hideCloseButton"
            :close-button-icon-size="closeButtonIconSize"
            :submit-icon-size="submitIconSize"
            :submit-image-icon-size="submitImageIconSize"
            :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null"
            :async-mode="asyncMode"
            :scroll-bottom="scrollBottom"
            :display-header="true"
            :send-images="true"
            :profile-picture-config="profilePictureConfig"
            :timestamp-config="timestampConfig"
            :link-options="linkOptions"
            :accept-image-types="'.png, .jpeg'"
            @onImageClicked="onImageClicked"
            @onImageSelected="onImageSelected"
            @onMessageSubmit="onMessageSubmit"
            @onType="onType"
            @onClose="onClose('param value')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chat from "./components/ChatBox.vue";
import { Message } from "../../../services/message.service.js";
import store from "../../../store/index";
import { DateTime } from "luxon";

import getUserAvatar from "../../../mixins/getUserAvatar";
import { SocketioService } from "../../../services/socketio.service.js";

export default {
  name: "chat-app",
  mixins: [getUserAvatar],
  components: {
    Chat,
  },
  data() {
    return {
      socketSvc: null,
      MultiAsyncDataHolder: [],
      newMessages: 0,
      rating: 3.7,
      numberOfRatings: 18,
      avatarFalBackImg: "ninja.png",
      MessagingSvc: null,
      visible: true,
      participants: [],
      messages: [],
      participantsDeprecated: [
        {
          name: "Sys Admin",
          id: 0,
          profilePicture:
            "https://marido-image-bucket.s3.amazonaws.com/ninja.png",
        },
        {
          name: "Mr. Handyman",
          id: 1,
          profilePicture:
            "https://marido-image-bucket.s3.amazonaws.com/ninja.png",
        },
        {
          name: "Sr. Gutierrez",
          id: 2,
          profilePicture:
            "https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg",
        },
        {
          name: "Go-To-Guys",
          id: 3,
          profilePicture:
            "https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg",
        },
      ],
      myselfDeprecated: {
        name: "Luiz Estevo",
        id: 58,
        profilePicture:
          "https://marido-image-bucket.s3.amazonaws.com/Linda.jpg",
      },
      messagesDeprecated: [
        {
          content: "Really?! I don't care! Haha",
          participantId: 1,
          timestamp: {
            year: 2012,
            month: 3,
            day: 5,
            hour: 20,
            minute: 10,
            second: 3,
            millisecond: 123,
          },
          uploaded: true,
          viewed: true,
          type: "text",
        },
        {
          content: "Really?! I don't care! Haha",
          participantId: 1,
          timestamp: {
            year: 2012,
            month: 3,
            day: 5,
            hour: 20,
            minute: 10,
            second: 3,
            millisecond: 123,
          },
          uploaded: true,
          viewed: true,
          type: "text",
        },
        {
          content: "Hey, Jhon Doe! How are you today",
          participantId: 1,
          timestamp: {
            year: 2012,
            month: 3,
            day: 5,
            hour: 20,
            minute: 10,
            second: 3,
            millisecond: 123,
          },
          uploaded: true,
          viewed: true,
          type: "text",
        },
        {
          content: "Hey, Adam! I'm felling really fine this evening.",
          participantId: 3,
          timestamp: {
            year: 2012,
            month: 3,
            day: 5,
            hour: 20,
            minute: 10,
            second: 3,
            millisecond: 123,
          },
          uploaded: true,
          viewed: true,
          type: "text",
        },
        {
          content: "Really?! I don't care! Haha www.google.com",
          participantId: 1,
          timestamp: {
            year: 2012,
            month: 3,
            day: 5,
            hour: 20,
            minute: 10,
            second: 3,
            millisecond: 123,
          },
          uploaded: true,
          viewed: true,
          type: "text",
        },
      ],
      chatTitle: "My Chat Room",
      placeholder: "Escriba tu mensage",
      colors: {
        header: {
          bgBlue: "#0d6efd",
          bg: "#fd5631",
          text: "#fff",
        },
        message: {
          myself: {
            bg: "#fff",
            text: "#525252",
          },
          others: {
            bg1: "#fb4141",
            bg2: "#fd5631",
            bg: "rgb(212, 253, 205)",
            textWhite: "#fff",
            text: "#525252",
          },
          messagesDisplay: {
            //bg: 'rgb(247, 243, 243)',
            //bg: '#f7f3f3'
            bg: "#f7f3f3",
          },
        },
        submitIcon: "#b91010",
        submitImageIcon: "#b91010",
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      },
      hideCloseButton: true,
      submitIconSize: 24,
      submitImageIconSize: 24,
      closeButtonIconSize: "20px",
      asyncMode: true,
      toLoad: [
        {
          content: "Hey, John Doe! How are you today?",
          participantId: 2,
          timestamp: {
            year: 2016,
            month: 3,
            day: 5,
            hour: 10,
            minute: 10,
            second: 3,
            millisecond: 123,
          },
          uploaded: true,
          viewed: true,
        },
        {
          content: "Hey, Adam! I'm feeling really fine this evening.",
          participantId: 3,
          timestamp: {
            year: 2016,
            month: 1,
            day: 5,
            hour: 19,
            minute: 10,
            second: 3,
            millisecond: 123,
          },
          uploaded: true,
          viewed: true,
        },
      ],
      scrollBottom: {
        messageSent: true,
        messageReceived: false,
      },
      profilePictureConfig: {
        others: true,
        myself: true,
        styles: {
          width: "30px",
          height: "30px",
          borderRadius: "50%",
        },
      },
      timestampConfig: {
        format: "HH:mm",
        relative: false,
      },
      // there are other options, you can check them here
      // https://soapbox.github.io/linkifyjs/docs/options.html
      linkOptions: {
        myself: {
          className: "myLinkClass",
          events: {
            // eslint-disable-next-line no-unused-vars
            click: function (e) {
              // alert("Link clicked!");
              console.log("event info", e);
            },
            // eslint-disable-next-line no-unused-vars
            mouseover: function (e) {
              // alert("Link hovered!");
            },
          },
          format: function (value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          },
        },
        others: {
          className: "othersLinkClass",
          events: {
            // eslint-disable-next-line no-unused-vars
            click: function (e) {
              // alert("Link clicked!");
            },
            // eslint-disable-next-line no-unused-vars
            mouseover: function (e) {
              // alert("Link hovered!");
            },
          },
          format: function (value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          },
        },
      },
    };
  },
  methods: {
    /*
     * chat emit listener methods
     */
    async onProcessIncomingMsg(event) {
      const msg = JSON.parse(event.data);
      // console.log("onProcessIncomingMsg.msg:", msg);

      const msgFromId = msg?.participantId || 0;
      const msgToId = msg.toId;
      const chatFromId = this.activeChat?.id;
      const chatToId = this.loggedUser.id;
      const action = msg?.action || "";
      const contactList = msg?.members;

      console.log("action", action);
      switch (action) {
        case "isContactOnLine":
          // console.log("isContactOnLine");
          this.updateContactListStatus(contactList);
          break;
        case "keepItAlive":
          // console.log("lets ignore keepItAlive msgs");
          break;
        default:
          // regular user communication msgs
          if (this.isMsgForThisChat(msgFromId, msgToId, chatFromId, chatToId)) {
            this.persistIncomingMsgToStore(msg, chatToId);
          }
      }
    },
    updateContactListStatus(contactList) {
      // console.log("updateContactListStatus.Enter", contactList);
      this.MultiAsyncDataHolder.forEach((value, i) => {
        let index = Object.values(contactList).indexOf(value[0]);
        // console.log(`index for ${value[0]} is ${index}`);
        if (index > -1) {
          this.MultiAsyncDataHolder[i][2] = "On-Line";
        } else {
          this.MultiAsyncDataHolder[i][2] = "Off-Line";
        }
      });
    },
    updateContactListStatusV1(contactList) {
      // just as backup function in case
      // there is any but with the previous one
      // console.log("updateContactListStatus.Enter", contactList);

      this.MultiAsyncDataHolder.forEach((value, i) => {
        this.MultiAsyncDataHolder[i][2] = "Off-Line";
        contactList.forEach((id) => {
          // console.log("2. compare id = value", [id, value]);
          if (id == value[0]) {
            // console.log(`set ${id} to On-Line`);
            this.MultiAsyncDataHolder[i][2] = "On-Line";
          }
        });
      });
    },
    async onMessageSubmit(message) {
      /*
       * example simulating an upload callback.
       * It's important to notice that even when your message wasn't send
       * yet to the server you have to add the message into the array
       */
      // console.log("message1", message);
      await this.addMessageToStore([message]);

      this.BroadcastToWebsocket(message);

      await this.persistMsgToDb(message);

      /*
       * you can update message state after the server response
       */
      // timeout simulating the request
      // TODO: Implemente message view functionality
      setTimeout(() => {
        message.uploaded = true;
        message.viewed = true;
      }, 2000);
    },
    // eslint-disable-next-line
    onType: function (e) {
      // eslint-disable-next-line
      // console.log("typing");
    },
    loadMoreMessages(resolve) {
      setTimeout(() => {
        resolve(this.toLoad);
        //Make sure the loaded messages are also added to our local messages copy or they will be lost
        this.messages.unshift(...this.toLoad);
        this.toLoad = [];
      }, 1000);
    },
    onClose(param) {
      console.log("onClose.Enter", param);
      // this.visible = false;
      console.log("goodbye chatroom");
      this.$socket = param;
      console.log("this.$socket", this.$socket);
    },
    // eslint-disable-next-line no-unused-vars
    onImageSelected({ file, message }) {
      let src =
        "https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR.jpg";
      this.messages.push(message);
      /**
       * This timeout simulates a requisition that uploads the image file to the server.
       * It's up to you implement the request and deal with the response in order to
       * update the message status and the message URL
       */
      setTimeout(
        (res) => {
          message.uploaded = true;
          message.src = res.src;
        },
        3000,
        { src }
      );
    },
    onImageClicked(message) {
      /**
       * This is the callback function that is going to be executed when some image is clicked.
       * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
       */
      console.log("Image clicked", message.src);
    },
    /*
     * helper  methods
     */
    async refreshChat(event) {
      if (event) {
        // console.log("target", event.target.id);
        const id = event.target.id || 0;
        const chatFromId = this.activeChat?.id;
        // console.log("id / FromId", [id, chatFromId]);

        if (id !== chatFromId) {
          await this.messagingSvc.getConversationByContactId({
            myself: this.loggedUser.id,
            contactId: id,
          });
          this.messagingSvc.setActiveChat(id);
          this.messagingSvc.SetMessagesAsRead(id, this.loggedUser.id);
        }

        // this.asyncDataHolder = [];
        // this.loadAsyncData().then(() => {
        //   // this.asyncDataHolder.forEach((value, index) => {
        //   //   console.log("Logging asyncDataHolder", [index, value]);
        //   // });
        // });
      }
    },
    async addMessageToStore(message) {
      // this.messages.push(message);
      await store.dispatch("addMessageToStore", message, {
        root: true,
      });
      /*
       TODO: Sample of pushing a asset to the message
      this.messages.push({
        type: "image",
        preview: null,
        src: "https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR.jpg",
        content: "image",
        participantId: 1,
        timestamp: {
          year: 2014,
          month: 3,
          day: 5,
          hour: 20,
          minute: 10,
          second: 3,
          millisecond: 123,
        },
        uploaded: true,
        viewed: false,
      });
      */
    },
    BroadcastToWebsocket(message) {
      // brodcasting msg to subscribers
      const payload = {
        action: "sendPrivate",
        message: message.content,
        fromId: message.participantId,
        toId: this.activeChat.id,
        ...message,
      };
      this.socketSvc.sendMessage(payload);
    },
    async persistMsgToDb(message) {
      // persist message into the db
      // eslint-disable-next-line no-unused-vars
      const dbMessage = {
        fromId: message.participantId,
        toId: this.activeChat.id,
        quoteId: "0",
        subject: message.timestamp,
        messageBody: message.content,
        wasRead: false,
        msgType: "chat",
        msgAsset: message.asset || "",
        updatedAt: message.timestamp,
        ...message,
      };

      await this.messagingSvc.add(false, dbMessage);
    },
    async isMsgForThisChat(msgFromId, msgToId, chatFromId, chatToId) {
      // console.log("Same Participant? msg for me?", [
      //   msgFromId == chatFromId,
      //   msgToId == chatToId,
      // ]);

      console.log("ParticipantID = ActiveChat | toId = LoggedUserId", [
        msgFromId,
        chatFromId,
        msgToId,
        chatToId,
      ]);
      if (msgFromId == chatFromId && msgToId == chatToId) {
        // console.log("Yes! msg is for this dialog: From/To", [
        //   msgFromId,
        //   msgToId,
        //   chatFromId,
        //   chatToId,
        // ]);
        return true;
      } else {
        // no need to process it since it is
        // for another dialog or just a system msg
        // console.log("No! msg is not for this dialog: From/To", [
        //   msgFromId,
        //   msgToId,
        //   chatFromId,
        //   chatToId,
        // ]);
        return false;
      }
    },
    async persistIncomingMsgToStore(msg, chatToId) {
      const msgObj = [
        {
          content: msg.message || "",
          myself: msg.participantId === chatToId,
          participantId: msg.participantId || 0,
          toId: msg.toId,
          timestamp: msg.timestamp || DateTime.local(),
          uploaded: msg.msgAsset,
          viewed: msg.wasRead,
          ...msg,
        },
      ];

      if (
        msg.messageType == "publicMessage" ||
        msg.messageType == "privateMessage"
      ) {
        if (msg.message) {
          console.log("just about to persist incoming message");
          store.dispatch("addMessageToStore", msgObj, {
            root: true,
          });
        } else {
          console.log("systemMessage", msgObj);
        }
      }
    },
    async getNrNewMessagesByContactId(fromId) {
      const toId = this.loggedUser.id;
      this.messagingSvc = new Message();
      const nrMessages = await this.messagingSvc.getNrOfNewMessagesByContactId(
        fromId,
        toId
      );
      return nrMessages;
    },
    async loadAsyncData() {
      // Article Reference: https://stackoverflow.com/questions/49575035/update-v-for-list-items-that-depend-on-a-promise-after-promise-resolves
      //
      // async await version
      this.MultiAsyncDataHolder = [];
      let status = "Off-line";
      // eslint-disable-next-line no-unused-vars
      await this.contactList.map(async (contact, i) => {
        await this.getNrNewMessagesByContactId(contact.id).then((response) => {
          // if (this.asyncDataHolder.lenght === 0) {
          // console.log("pushing item: ", [i, contact.id, response]);
          // status = this.isContactOnline(contact.id);
          // console.log("status", status);

          this.MultiAsyncDataHolder.push([contact.id, response, status]);
          // } else {
          //   TODO: Implement logit below
          //   this.MultiAsyncDataHolder.find(() => { find right contact and update its nrMessages }
          // }
        });
      });
      // TODO: Implement logit to avoid going to db for
      //       something we already have (sum of items in the array)

      await this.messagingSvc.getNrOfNewMessages(this.loggedUser.id);

      // const sum = this.asyncDataHolder.reduce(
      //   (partialSum, a) => partialSum + a,
      //   0
      // );
      // console.log("sum", sum);

      // let sum1 = 0;
      // for (let i = 0; i < this.asyncDataHolder.length; i++) {
      //   sum1 += this.asyncDataHolder[i];
      // }
      // console.log(sum1);

      // normal promise version
      // this.contactList.map((contact, i) => {
      //   this.getNrNewMessagesByContactId(contact).then((response) => {
      //     this.$set(this.asyncDataHolder, i, response);
      //   });
      // });
    },
    getNrNewMsgForContact(id) {
      let result = 0;
      // eslint-disable-next-line no-unused-vars
      this.MultiAsyncDataHolder.forEach((value, index) => {
        // console.log("isIdInclude?", [id, value.includes(id)]);
        if (value.includes(id)) {
          result = value[1];
        }
      });
      return result;
    },
    getStatusForContact(id) {
      let result = 0;
      // eslint-disable-next-line no-unused-vars
      this.MultiAsyncDataHolder.forEach((value, index) => {
        // console.log("isIdInclude?", [id, value.includes(id)]);
        if (value.includes(id)) {
          result = value[2];
        }
      });
      return result;
    },
    async refreshStatusForContactList() {
      // DONE: after we make the websocket call we will catch the responses from
      //       the socket and process into the right position in the
      //       MultiAsyncDataHolder array

      const payload = {
        action: "isContactOnLine",
        contact: this.loggedUser.id,
      };
      await this.socketSvc.sendMessage(payload);
    },
  },
  computed: {
    ...mapGetters(["loggedUser", "messages", "participants", "activeChat"]),
    contactList() {
      return store.getters["participants"];
    },
    firstContactId() {
      return this.$store.getters.participants[0].id;
    },
    myself() {
      return {
        name: this.loggedUser.firstName,
        id: this.loggedUser.id,
        profilePicture:
          "https://marido-image-bucket.s3.amazonaws.com/" +
          this.loggedUser.avatar,
      };
    },
  },
  beforeUnmount() {
    this.socketSvc.disconnect();
  },
  async created() {
    this.socketSvc = new SocketioService(this.loggedUser.id);

    await this.socketSvc.setupSocketConnection({
      url: process.env.VUE_APP_WEB_SOCKET,
      reconnectInterval: 2000,
      maxReconnectInterval: 3000,
      pulseInterval: 120000,
      loggedUserId: this.loggedUser.id,
    });

    console.log("created.addEventListener");
    await this.socketSvc.addEventListener(
      "message",
      this.onProcessIncomingMsg,
      false
    );
    await this.socketSvc.addEventListener("close", this.onClose, false);

    // set Listener for incoming messages
    // this.$socket.addEventListener("message", this.onProcessIncomingMsg, false);
    // this.$socket.addEventListener("close", this.onClose, false);
    // console.log("this.socket", this.$socket);

    this.messagingSvc = new Message();
    await this.messagingSvc.setMyself(this.myself);

    // const name = this.loggedUser.firstName;
    const id = this.loggedUser.id;
    // This responsability was transfer to inside the websocket class
    // const action = { action: "setName", id };
    // await this.socketSvc.sendMessage(action);

    // get overall number of new messages for logged user
    await this.messagingSvc.getNrOfNewMessages(id);

    this.messagingSvc.getMyContactList(this.loggedUser.id).then(() => {
      this.messagingSvc.setActiveChat(this.firstContactId);

      // get individual number of new messages for each contact
      this.messagingSvc.getConversationByContactId({
        myself: this.loggedUser.id,
        contactId: this.firstContactId,
      });

      // load nr new message for each contacts into a reactive array
      this.loadAsyncData().then(() => {
        this.refreshStatusForContactList();
      });
    });

    this.logIt(
      this?.loggedUser?.id || "visitor",
      "Entering chatroom: " + this?.loggedUser?.firstName || "",
      this.$options.name,
      this.user?.signInUserSession?.idToken?.jwtToken,
      false
    );
  },
  mounted() {},
};
</script>

<style scoped>
.participant-thumb {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.contentx {
  /* width: 100%; */
  display: flex;
  /* align-items: center; */
  /* justify-content: space-evenly; */
  /* flex-wrap: wrap; */
}

.chat-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: rgb(247, 243, 243); */
  padding: 10px 0 10px 0;
  height: 500px;
  /* width: 350px; */
  /* opacity: 0.3; */
}

.external-controller {
  background: #2c3e50;
  height: 300px;
  width: 600px;
  display: flex;
  color: #eee;
}

.controller-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  flex-wrap: wrap;
}

.btn-message {
  cursor: pointer;
  background: #eee;
  border: none;
  height: 40px;
  color: #2c3e50;
  border-radius: 5px;
  outline: none;
  transition: 0.3s;
}

.btn-participant {
  cursor: pointer;
  background: #eee;
  border: none;
  height: 40px;
  color: #2c3e50;
  border-radius: 5px;
  outline: none;
  transition: 0.3s;
}

.btn-message:hover {
  background: rgb(255, 255, 255);
}
#chatItem:hover {
  color: #000;
  background-color: #f5f4f8;
  border-color: #f5f4f8;
}

.icon-container {
  width: 50px;
  height: 50px;
  position: relative;
}

imgx {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.status-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: green;
  border: 2px solid white;
  left: 40px;
  bottom: 0px;
  position: absolute;
}
.logged-in {
  background-color: green;
}

.logged-out {
  background-color: red;
}
</style>
