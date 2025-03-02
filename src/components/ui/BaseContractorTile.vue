<template>
  <!-- Bid modal-->
  <base-contact-contractor
    :contractorId="id"
    :projectId="id"
    :projectTitle="title"
    :description="description"
    :id="id"
    :title="title"
    :avatar="avatar"
    :rating="rating"
    :numberOfRatings="numberOfRatings"
    :reviews="reviews"
    :distance="distance"
    :newMember="false"
    :verified="verified"
    :featured="featured"
    :memberSince="createdAt"
    :services="serviceTypes"
    :isFavorite="verified"
    :email="email"
    :phone="phone"
  />

  <div class="col-sm-6 col-xl-4">
    <div class="card shadow-sm card-hover border-0 h-100">
      <div class="tns-carousel-wrapper card-img-top card-img-hover">
        <a class="img-overlay" href="#signup-modal" data-bs-toggle="modal"></a>
        <div class="position-absolute start-0 top-0 pt-3 ps-3">
          <span class="d-table badge bg-info mb-1" v-if="newMember">New</span>
          <span class="d-table badge bg-success mb-1" v-if="verified"
            >Verified</span
          >
          <span class="d-table badge bg-danger mb-1" v-if="featured"
            >Featured</span
          >
        </div>
        <div class="position-absolute end-0 top-0 pt-3 pe-3 zindex-5">
          <button
            class="btn btn-icon btn-light btn-xs text-primary rounded-circle shadow-sm"
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title=""
          >
            <!-- :class="{ fi-heart-filled: isFavoriteFlag }" -->
            <i
              v-bind:class="{
                'fi-heart-filled': isFavoriteFlag,
                'fi-heart': !isFavoriteFlag,
              }"
              id="fav-Icon"
              :title="id"
              @click="setFavorite"
            ></i>
          </button>
        </div>
        <div class="tns-carousel-inner-active">
          <img v-bind:src="requiredImage(avatar)" alt="Avatar" />
        </div>
      </div>
      <div class="card-body position-relative pb-3">
        <!-- <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
          For rent
        </h4> -->
        <h3 class="h6 mb-2 fs-base">
          <a class="nav-link stretched-link" :href="publicProfile">{{
            title
          }}</a>
        </h3>

        <!-- Contact Info -->
        <ul class="list-unstyled fs-sm mt-3 mb-3">
          <li>
            <a class="nav-link fw-normal p-0" href="tel:{{ phone }}"
              ><i class="fi-phone fw-bold text-primary opacity-100 me-2"></i
              >{{ phone }}</a
            >
          </li>
          <li>
            <a
              class="nav-link fw-normal p-0"
              href="mailto:
                        {{
                        email
                        }}"
              ><i
                class="fi-mail fw-bold text-primary text-primaryopacity-100 me-2"
              ></i
              >{{ email }}</a
            >
          </li>
        </ul>

        <!-- Description -->
        <p class="mb-0 fs-sm text-muted">{{ description }}</p>
      </div>

      <!-- Servicios Ofrecidos -->
      <div class="py-0 px-2">
        <h6 class="mb-0 fs-xs fw-normal text-uppercase">
          Servicios Ofrecidos:
        </h6>
        <div class="center py-2">
          <base-badge
            v-for="service in serviceTypes"
            :key="service"
            :type="service"
            :title="service"
          ></base-badge>
        </div>
      </div>

      <!-- Miembro desde -->
      <div>
        <p class="mx-2 fs-sm text-muted">
          <strong>Miembro desde:</strong>
          {{ date(memberSince, "DD MMM YY") }}
        </p>
      </div>

      <!-- Proyectos Completados -->
      <div>
        <p class="mx-2 fs-sm text-muted">
          <strong>Proyectos Completados:</strong>
          {{ nrProjectsCompleted || 0 }}
        </p>
      </div>

      <!-- Card Footer -->
      <div
        class="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap"
      >
        <ul class="list-inline mb-0 fs-xs">
          <li class="list-inline-item pe-1">
            <i
              class="fi-star-filled mt-n1 me-1 fs-base text-warning align-middle"
            ></i
            ><b>{{ rating }}</b
            ><span class="text-muted">&nbsp;({{ numberOfRatings }})</span>
          </li>
          <li class="list-inline-item pe-1">
            <i
              class="fi-chat-circle mt-n1 me-1 fs-base text-muted align-middle"
            ></i
            >&nbsp;{{ reviews }}
          </li>
          <li class="list-inline-item pe-1">
            <i class="fi-map-pin mt-n1 me-1 fs-base text-muted align-middle"></i
            >{{ distance }}&nbsp;km del centro
          </li>
        </ul>
      </div>

      <!-- Button -->
      <div
        class="card-footer d-flex align-items-center justify-content-center mx-3 pt-2 px-2 text-nowrap"
      >
        <a
          class="btn btn-outline-primary px-3"
          :href="`#modal-contact-contractor` + id"
          data-bs-toggle="modal"
          >Contactar <i class="fas fa-paper-plane ms-2"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import DateFormatter from "../../mixins/dateFormatter.js";
import { mapGetters } from "vuex";
import BaseContactContractor from "./baseContactContractor.vue";

export default {
  name: "contractor-tile",
  mixins: [DateFormatter],
  props: [
    "id",
    "title",
    "description",
    "avatar",
    "rating",
    "numberOfRatings",
    "reviews",
    "distance",
    "newMember",
    "verified",
    "featured",
    "memberSince",
    "services",
    "isFavorite",
    "phone",
    "email",
    "nrProjectsCompleted",
  ],
  components: {
    BaseContactContractor,
  },
  data() {
    return {
      isFavoriteFlag: this.isFavorite,
    };
  },
  methods: {
    requiredImage(imageName) {
      try {
        return `${require("../../img/real-estate/catalog/" + imageName)}`;
      } catch (error) {
        // fallback image
        return `${require("../../img/real-estate/catalog/home.fix.avatar.jpeg")}`;
      }
    },
    async setFavorite(event) {
      const data = {
        clientId: this.userId,
        contractorId: event.target.title,
      };

      try {
        if (!this.isFavoriteFlag) {
          // TODO: Investigate why the delete happens before Insert
          //
          // first delete to make sure it does does not exist anymore
          // and then insert new one to favorite table
          // await this.$store
          //   .dispatch("favorites/deleteFavorite", data)
          //   .then(() => {
          //     this.$store.dispatch("favorites/createFavorite", data);
          //   });
          this.$store.dispatch("favorites/createFavorite", data);

          this.isFavoriteFlag = true;
        } else {
          // if client unlikes contractor, just delete it
          this.$store.dispatch("favorites/deleteFavorite", data);
          this.isFavoriteFlag = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["userId"]),
    publicProfile() {
      return "/contractors/" + this.id;
    },
    serviceTypes() {
      /*
       *   Explanation: We had to replace double quotes for single because in our database
       *                it is saved with single however, string.parse does not like and it
       *                fails to convert it to an array
       *
       *                Original string "['Pintura', 'Remodelacion']""
       *                Final arrray =  error
       *
       *                Original string '["Pintura", "Remodelacion"]'
       *                Final Array = [ "Pintura", "Remodelacion" ]
       */
      // console.log("List of Services from DB", this.services);
      var data = this.services;
      try {
        const replaced = data.replaceAll(`'`, `"`);
        // console.log("data", replaced);
        var arr = JSON.parse(replaced);
        return arr;
      } catch (error) {
        return data;
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped></style>
