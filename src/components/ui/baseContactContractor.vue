<template>
  <!-- Contact Contractor Modal-->
  <div
    class="modal fade"
    :id="`modal-contact-contractor` + id"
    tabindex="-1"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-lg modal-dialog-centered p-2 my-0 mx-auto"
      style="max-width: 950px"
    >
      <div class="modal-content">
        <div class="modal-body px-0 py-2 py-sm-0">
          <button
            class="btn-close position-absolute top-0 end-0 mt-3 me-3"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="close"
          ></button>
          <div class="row mx-0 align-items-center">
            <!-- Contractor Info Display -->
            <div class="col-md-6 border-end-md p-4 p-sm-5">
              <div class="card shadow-sm mb-4">
                <div class="card-body">
                  <div class="tns-carousel-inner-active mb-3">
                    <img v-bind:src="requiredImage(avatar)" alt="Avatar" />
                  </div>
                  <div class="d-flex align-items-start justify-content-between">
                    <!-- Avatar and Name -->
                    <a
                      class="text-decoration-none"
                      href="real-estate-vendor-properties.html"
                    >
                      <!-- TODO: Consider to have a avatar for the Contractor as a person not a business -->
                      <!-- <img
                        class="rounded-circle mb-2"
                        src="../../img/avatars/22.jpg"
                        width="60"
                        alt="Avatar"
                      /> -->

                      <h5 class="mb-1">{{ title }}</h5>
                      <div class="mb-3">
                        <!-- Rating -->
                        <div class="mb-3 align-items-center"></div>
                        <span class="star-rating">
                          <star-rating
                            v-bind:star-size="20"
                            v-bind:show-rating="false"
                            :rating="rating" /></span
                        ><span class="ms-1 fs-sm text-muted"
                          >({{ numberOfRatings }})</span
                        >
                      </div>

                      <!-- <p class="text-body">{{ title }}</p> -->
                    </a>
                    <!-- Social Links -->
                    <div class="text-nowrap">
                      <button
                        class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle ms-2 mb-2"
                        type="button"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Add to Wishlist"
                        aria-label="Add to Wishlist"
                      >
                        <i class="fi-heart"></i>
                      </button>
                      <div
                        class="dropdown d-inline-block"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Share"
                      >
                        <button
                          class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle ms-2 mb-2"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="fi-share"></i>
                        </button>
                        <div
                          class="dropdown-menu dropdown-menu-end my-1"
                          style=""
                        >
                          <button class="dropdown-item" type="button">
                            <i class="fi-facebook fs-base opacity-75 me-2"></i
                            >Facebook
                          </button>
                          <button class="dropdown-item" type="button">
                            <i class="fi-twitter fs-base opacity-75 me-2"></i
                            >Twitter
                          </button>
                          <button class="dropdown-item" type="button">
                            <i class="fi-instagram fs-base opacity-75 me-2"></i
                            >Instagram
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Phone & Email -->
                  <ul class="list-unstyled border-bottom mb-2 pb-2">
                    <li>
                      <a class="nav-link fw-normal p-0" href="tel:{{ phone }}"
                        ><i
                          class="fi-phone fw-bold text-primary opacity-100 me-2"
                        ></i
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

                  <!-- Descripcion -->
                  <p class="mb-3 fs-sm text-muted">
                    {{ description }}
                  </p>
                  <!-- Servicios -->
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
                  <!-- Ratings -->
                  <div
                    class="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap"
                  >
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
                        <i
                          class="fi-chat-circle mt-n1 me-1 fs-base text-muted align-middle"
                        ></i
                        >&nbsp;{{ reviews }}
                      </li>
                      <li class="list-inline-item pe-1">
                        <i
                          class="fi-map-pin mt-n1 me-1 fs-base text-muted align-middle"
                        ></i
                        >{{ distance }}&nbsp;km del centro
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contactar Contractor Form -->
            <div class="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5">
              <svc-request-email-template
                ref="mybidemailtemplate"
                :projectId="project.id"
                :projectTitle="project.title"
              ></svc-request-email-template>

              <div class="card shadow-sm mb-1 mt-0">
                <div class="d-flex align-items-center mt-4">
                  <img
                    class="img-fluid mx-4"
                    src="../../assets/img/pricing/icon-1.svg"
                    alt="..."
                    width="42"
                  />

                  <h4 class="modal-title mt-3 text-left">
                    Contactar Contratista
                  </h4>
                  <br />
                </div>

                <div class="modal-body px-sm-5 px-4">
                  <form class="needs-validation" validate>
                    <div v-if="hasProjects">
                      <!-- Proyecto Name -->
                      <div class="mb-3">
                        <label class="form-label fw-bold">Proyecto:</label
                        >&nbsp;
                        <label class="" id="Proyecto" type="text">{{
                          project.title
                        }}</label>
                      </div>

                      <!-- Start Date  -->
                      <div class="mb-3">
                        <label class="form-label fw-bold"
                          >Fecha de Inicio:</label
                        >&nbsp;
                        <label class="" id="startDate" type="text">{{
                          date(project.startDate, "DD MMM YY")
                        }}</label>
                      </div>
                    </div>

                    <!-- Message -->
                    <div class="mb-3">
                      <label class="form-label fw-bold">Mensaje</label>
                      <textarea
                        class="form-control form-quriar-control border-400"
                        :class="v$.message.$error ? 'is-invalid' : ''"
                        id="bidDescription"
                        placeholder="Describir los detalles de como el contratista te puede contactar"
                        style="height: 150px"
                        v-model="v$.message.$model"
                        @change="SetEmailContent"
                      />
                      <div
                        class="input-errors text-danger"
                        v-for="error of v$.message.$errors"
                        :key="error.$uid"
                      >
                        <div class="error-msg">{{ error.$message }}</div>
                      </div>
                    </div>

                    <button
                      class="btn btn-primary d-block w-100 mb-4"
                      type="submit"
                      @click.prevent="save"
                      :disabled="v$.$error"
                    >
                      Enviar Mensaje
                      <i class="fi-send me-3" aria-hidden="true"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import StarRating from "vue-star-rating";

import * as types from "../../utils/types.js";
import DateFormatter from "../../mixins/dateFormatter.js";
import DismissModal from "../../mixins/dissmissModal.js";
import msgBoxDialog from "../../mixins/msgBoxDialog.js";

import { Message } from "../../services/message.service.js";
import SvcRequestEmailTemplate from "../email/serviceRequestEmail.vue";

export default {
  name: "base-contact-contractor",
  mixins: [DateFormatter, msgBoxDialog, DismissModal],
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
  ],
  components: {
    SvcRequestEmailTemplate,
    StarRating,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      message: null,
    };
  },
  validations() {
    const requiedMsg = "Campo obligatorio.";

    return {
      message: { required: helpers.withMessage(requiedMsg, required) },
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
    async save() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }

      try {
        this.message = new Message();

        this.message.add(true, {
          fromId: this.loggedUser.id,
          toId: this.id,
          quoteId: this.project.projectId,
          subject: `Marido-en-alquiler: Nueva Solicitud de Servicio`,
          messageBody: this.emailContent,
          wasRead: false,

          name: `Marido-en-alquiler`,
          email: this.email,
          mobile: this.phone,
        });

        this.resetForm();
        console.log("baseContractor.msgbox issued");
        this.triggerMsgBox(true, "Tu solicitud fue enviada al contratista.");
        this.dismissModal("#modal-contact-contractor" + this.id);
        this.sysLogIt();
      } catch (error) {
        this.triggerMsgBox(true, "Erro al registrar la solicitud. - " + error);
      }
    },
    resetForm() {
      this.mensaje = null;
    },
    async getProjectInfoClientId(clientId) {
      try {
        await this.$store.dispatch("projects/getProjectsByClient", {
          clientId: clientId,
        });
      } catch (e) {
        console.error(e);
      }
    },
    SetEmailContent() {
      this.$store.dispatch("setEmailAttributes", {
        projectTitle: this.project.title,
        projectDescription: this.project.description,
        projectStartDate: this.project.startDate,
        firstName: this.loggedUser.firstName,
        phone: this.loggedUser.phone,
        email: this.loggedUser.email,
        description: this.message,
      });
    },
    sysLogIt() {
      this.logIt(
        this?.loggedUser?.id,
        "Message To: " + this.email,
        this.$options.name,
        this?.user?.signInUserSession?.idToken?.jwtToken,
        true
      );
      // this.user.signInUserSession.idToken.jwtToken || "",
    },
  },
  computed: {
    ...mapGetters([types.LOGGED_USER]),
    project: {
      get() {
        const allProjects = this.$store.getters["projects/projects"];

        let createdProjects = allProjects.filter((project) => {
          if (project.status == "created") {
            return true;
          }
        });
        if (createdProjects.length > 0) {
          return createdProjects[0];
        } else {
          return {};
        }
      },
    },
    hasProjects() {
      return this.$store.getters["projects/hasProjects"];
    },
    emailContent: {
      get() {
        let childEl = this.$refs.mybidemailtemplate.$el.innerHTML;
        return childEl;
      },
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
  async created() {
    await this.getProjectInfoClientId(this.loggedUser.id);
  },
  mounted() {},
};
</script>

<style scoped></style>
