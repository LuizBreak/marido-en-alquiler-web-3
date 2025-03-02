<template>
  <div class="col-lg-7 col-md-7 mb-5">
    <!-- Page content-->
    <div class="row">
      <!-- Content-->
      <h2 class="h2 mb-0">
        <i class="fi-bell expand text-primary" aria-hidden="true" />
        Notificaciones
      </h2>
      <p class="pt-1 mb-4">
        Get real-time updates on your projects, Newsletter, and more
      </p>
      <!-- Nav tabs-->
      <ul
        class="nav nav-tabs flex-column flex-sm-row align-items-stretch align-items-sm-start border-bottom mb-4"
        role="tablist"
        v-show="false"
      >
        <li class="nav-item me-sm-3 mb-3">
          <a
            class="nav-link text-center active"
            href="#notifications-rent"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="notifications-rent"
            aria-selected="true"
            >Project notifications</a
          >
        </li>
        <li class="nav-item mb-3">
          <a
            class="nav-link text-center"
            href="#notifications-sale"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="notifications-sale"
            aria-selected="false"
            >Offer notifications</a
          >
        </li>
      </ul>
      <!-- Tabs content-->
      <div
        class="tab-content py-2 card card-body border-0 shadow-sm p-4 mb-4"
        id="notification-settings"
      >
        <!-- Clients notifications tab-->
        <div
          class="tab-pane fade show active"
          id="notifications-rent"
          role="tabpanel"
        >
          <!-- Bids Alert -->
          <div class="d-flex justify-content-between mb-4">
            <div class="me-2">
              <h6 class="mb-1">New bids alerts</h6>
              <p class="fs-sm mb-0">
                Bids provided by potential contractors sent to your email
              </p>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="bid-alerts"
                v-model="user.ImmediateNotification"
                :checked="!!user.ImmediateNotification"
                @change="updateSettings"
              />
              <label class="form-check-label" for="bid-alerts" v-if="false">{{
                user.ImmediateNotification
              }}</label>
            </div>
          </div>

          <!-- Newsletter Alert -->
          <div class="d-flex justify-content-between mb-4">
            <div class="me-2">
              <h6 class="mb-1">Newsletters updates</h6>
              <p class="fs-sm mb-0">
                Tricks and advices on how to better manage your projects
              </p>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="newsletter"
                v-model="user.newsletter"
                :checked="!!user.newsletter"
                @change="updateSettings"
              />
              <label class="form-check-label" for="newsletter" v-if="false">
                {{ user.newsletter }}</label
              >
            </div>
          </div>
        </div>
        <!-- Sale notifications tab-->
        <div class="tab-pane fade" id="notifications-sale" role="tabpanel">
          <div class="d-flex justify-content-between mb-4">
            <div class="me-2">
              <h6 class="mb-1">New sale alerts</h6>
              <p class="fs-sm mb-0">
                New sales that match your
                <a href="real-estate-account-wishlist.html">Wishlist</a>
              </p>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="new-sale"
                checked
              />
              <label
                class="form-check-label"
                for="new-sale"
                v-if="false"
              ></label>
            </div>
          </div>
          <div class="d-flex justify-content-between mb-4">
            <div class="me-2">
              <h6 class="mb-1">Sale status updates</h6>
              <p class="fs-sm mb-0">
                Updates like price changes and off-market status on your
                <a href="real-estate-account-wishlist.html">Wishlist</a>
              </p>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="sale-update"
              />
              <label
                class="form-check-label"
                for="sale-update"
                v-if="false"
              ></label>
            </div>
          </div>
          <div class="d-flex justify-content-between mb-4">
            <div class="me-2">
              <h6 class="mb-1">Finder recommendations</h6>
              <p class="fs-sm mb-0">
                Sales we think you'll like. These recommendations may be
                slightly outside your search criteria
              </p>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="sale-recomendation"
              />
              <label
                class="form-check-label"
                for="sale-recomendation"
                v-if="false"
              ></label>
            </div>
          </div>
        </div>

        <!-- Contractors Match Suggestions -->
        <div class="d-flex justify-content-between mb-4">
          <div class="me-2">
            <h6 class="mb-1">Automatic contractor matches</h6>
            <p class="fs-sm mb-0">
              Suggestion of contractors you may be interested on for your
              project
            </p>
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="matchesNotification"
              v-model="user.matchesNotification"
              :checked="!!user.matchesNotification"
              @change="updateSettings"
            />
            <label
              class="form-check-label"
              for="matchesNotification"
              v-if="false"
              >{{ user.matchesNotification }}</label
            >
          </div>
        </div>

        <!-- Contractors special offers -->
        <div class="d-flex justify-content-between mb-4">
          <div class="me-2">
            <h6 class="mb-1">Contractors special offers</h6>
            <p class="fs-sm mb-0">
              Occasional notifications about promotions offered by contractors
            </p>
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="specialOffersNotification"
              v-model="user.specialOffersNotification"
              :checked="!!user.specialOffersNotification"
              @change="updateSettings"
            />
            <label
              class="form-check-label"
              for="specialOffersNotification"
              v-if="false"
              >{{ user.specialOffersNotification }}</label
            >
          </div>
        </div>
      </div>
      <div
        class="border-top pt-4 card card-body border-0 shadow-sm p-4 mb-4"
        v-if="false"
      >
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="all-notifications"
            data-master-checkbox-for="#notification-settings"
            checked
          />
          <label class="form-check-label" for="all-notifications"
            >Enable / disable all notifications</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "../../utils/types.js";
import { mapGetters } from "vuex";
import { Client } from "../../services/client.service";

export default {
  name: "my-notifications",
  components: {},
  data() {
    return {
      theClient: {},
      user: this.getUserCopy(),
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: this.isClient ? "/perfil" : "/profile",
          caption: "Cuenta",
          isActive: false,
          aria: "",
        },
        {
          url: "/perfil/notificaciones",
          caption: "Notificaciones",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  methods: {
    updateSettings() {
      this.theClient.update(this.user);
    },
    async getUserCopy() {
      const obj = await Object.assign({}, this.client);
      return obj;
    },
  },
  computed: {
    ...mapGetters([types.LOGGED_USER]),
    client: {
      get() {
        return { ...this.$store.getters["clients/client"] };
      },
      set() {},
    },
  },
  created() {},
  async mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
    this.user = await this.getUserCopy();
    this.theClient = new Client(await this.getUserCopy());
  },
};
</script>

<style scoped></style>
