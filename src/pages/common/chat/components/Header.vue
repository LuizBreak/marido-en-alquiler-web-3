<template>
  <div class="header-container" :style="{ background: colors.header.bg }">
    <slot
      name="header"
      :colors="colors"
      :chatTitle="chatTitle"
      :participants="selectedParticipant"
      :myself="myself"
    ></slot>
    <div v-if="!hasHeaderSlot" class="header-title">
      <p class="header-title-text mt-3" :style="{ color: colors.header.text }">
        <!-- {{ chatTitle }} -->
      </p>
      <p
        class=""
        :style="{ color: colors.header.text }"
        v-for="participant in selectedParticipant"
        :key="participant.id"
      >
        <img class="participant-thumb" :src="participant.profilePicture" />
        <span v-if="false">{{ myself.name }}, </span>

        <span class="header-title-text mt-3 mx-3">{{ participant.name }}</span>
      </p>
    </div>

    <div v-if="!hideCloseButton && !hasHeaderSlot" class="header-exit">
      <slot name="close-button">
        <a
          class="header-exit-button"
          href="#"
          :style="{ fontSize: closeButtonIconSize }"
          @click.prevent="onClose"
          >✕</a
        >
      </slot>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapGetters, mapMutations } from "vuex";
/*
 * TODO: improve support for more than 10 participants (the names list may break in some cases)
 */
export default {
  props: {
    colors: {
      type: Object,
      required: true,
    },
    borderStyle: {
      type: Object,
      required: false,
      default: () => {
        return {
          topLeft: "10px",
          topRight: "10px",
          bottomLeft: "10px",
          bottomRight: "10px",
        };
      },
    },
    hideCloseButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    closeButtonIconSize: {
      type: String,
      required: false,
      default: "15px",
    },
    /* onClose: {
                type: Function,
                required: false,
                default: () => false
            } */
  },
  computed: {
    ...mapGetters(["participants", "chatTitle", "myself"]),
    hasHeaderSlot: function () {
      return !!this.$slots["header"];
    },
    selectedParticipant: function () {
      let curr_participant = [];
      this.participants.forEach((participant) => {
        if (participant.id === this.activeChat) {
          curr_participant.push(participant);
          return participant;
        }
      });
      return curr_participant;
    },
    activeChat() {
      return Number(this.$store.getters.activeChat?.id || 0);
    },
  },
  methods: {
    onClose: function () {
      this.$emit("onClose");
    },
  },
};
</script>

<style lang="less">
.quick-chat-container .header-container {
  height: 70px;
  display: flex;
  padding: 0 20px 0 10px;
  align-items: center;
  -webkit-box-shadow: 0 2px 20px 2px rgba(90, 90, 90, 0.47);
  box-shadow: 0 2px 20px 2px rgba(90, 90, 90, 0.47);
  z-index: 5;

  .header-title {
    padding: 10px;
    flex: 1;
    text-align: left;
  }

  .header-title-text {
    margin-bottom: 0;
    font-weight: bolder;
  }

  .header-paticipants-text {
    color: #ffffff;
    font-size: 12px;
    margin-top: 5px;
    max-height: 30px;
    overflow: hidden;
    font-weight: bolder;
  }

  .header-exit-button {
    text-decoration: none;
    color: #fff;
    font-size: 20px;
  }

  .icon-close-chat {
    color: #fff;
    width: 100%;
  }

  .icon-close-chat:hover {
    color: rgb(238, 121, 121);
  }

  .participant-thumb {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
  }
}
</style>
