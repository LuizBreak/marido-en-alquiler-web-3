// Article reference: https://forum.vuejs.org/t/show-image-and-when-it-doesnt-exists-then-show-another-image/52489/7

import { apiSvc } from "../services";

export default {
  data() {
    return {
      imgError: false,
      fallBackImg: "ninja.png",
    };
  },
  methods: {
    onImgError(bkpImage) {
      this.imgError = true;
      // in case caller want to replace default fallbackImage
      if (typeof bkpImage !== "undefined") {
        this.fallBackImg = bkpImage;
      }
    },
    // used by base-project-tile and favorites
    requiredImage(imageName) {
      try {
        return `background-image:url(${require("../img/real-estate/catalog/" +
          imageName)})`;
      } catch (error) {
        // fallback image
        return `background-image:url(${require("../img/real-estate/catalog/home.fix.avatar.jpeg")})`;
      }
    },
    async setUserAvatar(userId, avatar) {
      try {
        await apiSvc.post(`accounts/setavatar/${userId}`, {
          avatar,
        });
        this.$store.commit("setUserAvatar", avatar);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    userAvatar() {
      const path = this.imgError
        ? `https://marido-image-bucket.s3.amazonaws.com/${this.fallBackImg}`
        : `https://marido-image-bucket.s3.amazonaws.com/${this.avatarImg}`;

      return path;
    },
    avatarImg() {
      return this.loggedUser.avatar || this.fallBackImg;
    },
    chatUserAvatar(img, fallbackImg) {
      const path = this.imgError
        ? `https://marido-image-bucket.s3.amazonaws.com/${fallbackImg}`
        : `https://marido-image-bucket.s3.amazonaws.com/${img}`;

      return path;
    },
  },
};
