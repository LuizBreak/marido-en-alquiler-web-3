<template>
  <!-- Bid modal-->
  <div class="modal fade" :id="`modal-bid-` + projectId" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <bid-email-template
          ref="mybidemailtemplate"
          :projectId="projectId"
          :projectTitle="projectTitle"
          v-show="false"
        ></bid-email-template>

        <div
          class="modal-header d-block position-relative border-0 pb-0 px-sm-5 px-4"
        >
          <button
            class="btn-close position-absolute top-0 end-0 mt-3 me-3"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="d-flex align-items-center">
          <img
            class="img-fluid mx-5"
            src="../../assets/img/pricing/icon-4.svg"
            alt="..."
            width="52"
          />

          <h3 class="modal-title mt-4 text-center">Hacer una Oferta</h3>
          <br />
          <!-- <h3 class="modal-title mt-4 text-center">
            {{ projectTitle }} - {{ startDate }} - {{ description }}
          </h3> -->
        </div>

        <div class="modal-body px-sm-5 px-4">
          <form class="needs-validation" validate>
            <!-- Proyecto Name -->
            <div class="mb-3">
              <label class="form-label fw-bold">Proyecto:</label>&nbsp;
              <label class="" id="Proyecto" type="text">{{
                projectTitle
              }}</label>
            </div>

            <!-- Start Date  -->
            <div class="mb-3">
              <label class="form-label fw-bold">Fecha de Inicio:</label>&nbsp;
              <label class="" id="startDate" type="text">{{ startDate }}</label>
            </div>

            <!-- Bid Price  -->
            <div class="mb-3">
              <label class="form-label fw-bold">Precio:</label>&nbsp;
              <div class="input-group">
                <span class="input-group-text fs-base">$</span>
                <input
                  class="form-control range-slider-value-min"
                  id="price"
                  type="number"
                  placeholder="Precio de tu oferta"
                  required
                  v-model="bidPrice"
                  :class="v$.bidPrice.$error ? 'is-invalid' : ''"
                  @change="SetEmailContent"
                />
              </div>
              <div
                class="input-errors text-danger"
                v-for="error of v$.bidPrice.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <!-- Descripcion -->
            <div class="mb-3">
              <label class="form-label fw-bold">Descripcion de la oferta</label>
              <textarea
                class="form-control form-quriar-control border-400"
                :class="v$.bidDescription.$error ? 'is-invalid' : ''"
                id="bidDescription"
                placeholder="Describir los detalles de como deseas a ejecutar este proyecto"
                style="height: 150px"
                v-model="v$.bidDescription.$model"
                @change="SetEmailContent"
              />
              <div
                class="input-errors text-danger"
                v-for="error of v$.bidDescription.$errors"
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
              Hacer Oferta
              <i class="fi-send me-3" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { mapGetters } from "vuex";

import * as types from "../../utils/types.js";
import DateFormatter from "../../mixins/dateFormatter.js";
import DismissModal from "../../mixins/dissmissModal.js";
import msgBoxDialog from "../../mixins/msgBoxDialog.js";

import { Quote } from "../../services/quote.service.js";
import { Message } from "../../services/message.service.js";
import BidEmailTemplate from "../email/bidemail.vue";

export default {
  name: "project-bid",
  mixins: [DateFormatter, msgBoxDialog, DismissModal],
  props: ["projectId", "projectTitle", "startDate", "description"],
  components: {
    BidEmailTemplate,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      bidPrice: null,
      bidDescription: null,
    };
  },
  validations() {
    const requiedMsg = "Campo obligatorio.";
    const minValueMsg = "Precio tiene que ser mayor que cero.";

    return {
      bidDescription: { required: helpers.withMessage(requiedMsg, required) },
      bidPrice: {
        required: helpers.withMessage(requiedMsg, required),
        minValue: helpers.withMessage(minValueMsg, function (value) {
          return value >= 0;
        }),
      },
    };
  },
  methods: {
    async save() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      this.quote = new Quote(
        this.projectId,
        this.loggedUser.id,
        this.bidPrice,
        this.bidDescription,
        this.date(Date.now(), "YYYY-MM-DD hh:mm:ss a")
      );

      try {
        this.quote.add();
        this.notifyClient();

        this.resetForm();
        this.triggerMsgBox(true, "Tu oferta fue enviada al cliente.");
        this.dismissModal("#modal-bid-" + this.projectId);
        this.sysLogIt();
      } catch (error) {
        console.log("bid error", error);
        this.triggerMsgBox(true, "Erro al registrar la oferta. - " + error);
      }
    },
    async notifyClient() {
      await this.getClientInfoProjectId(this.projectId);

      // subject, fromId, toId, quoteId, messageBody
      // this.message = new Message(
      //   "",
      //   this.contractor.id,
      //   this.client.id,
      //   this.projectId,
      //   ""
      // );

      // TODO: Investiga why it does not update the state
      //       to fix it I sued @change on fields :(
      //
      // this.SetEmailContent();
      this.message = new Message();

      // console.log("messagebody", this.emailContent);

      this.message.add(true, {
        fromId: this.contractor.id,
        toId: this.client.id,
        quoteId: this.projectId,
        subject: `Marido-en-alquiler: Nueva Oferta a tu proyecto`,
        messageBody: this.emailContent,
        wasRead: false,

        name: `Marido-en-alquiler`,
        email: this.client.email,
        mobile: this.client.phone,
      });
    },
    resetForm() {
      // this.contractorId = this.loggedUser.id;
      this.bidPrice = null;
      this.bidDescription = null;
    },
    async getClientInfoProjectId(projectId) {
      try {
        await this.$store.dispatch("clients/getClientInfoByProjectId", {
          id: projectId,
        });
      } catch (e) {
        console.error(e);
      }
    },
    SetEmailContent() {
      this.$store.dispatch("setEmailAttributes", {
        clientEmail: this.client.email,
        clientPhone: this.client.phone,
        bidPrice: this.bidPrice,
        bidDescription: this.bidDescription,
      });
    },
    sysLogIt() {
      this.logIt(
        this?.loggedUser?.id,
        "Offer To: " + this.client.email,
        this.$options.name,
        this.user.signInUserSession?.idToken?.jwtToken,
        true
      );
    },
  },
  computed: {
    ...mapGetters([types.LOGGED_USER, types.IS_LOGGED_IN]),
    client: {
      get() {
        return { ...this.$store.getters["clients/client"] };
      },
    },
    contractor: {
      get() {
        return { ...this.$store.getters["contractors/contractor"] };
      },
    },
    emailContent: {
      get() {
        let childEl = this.$refs.mybidemailtemplate.$el.innerHTML;
        return childEl;
      },
    },
  },
  async created() {
    await this.getClientInfoProjectId(this.projectId);
  },
  mounted() {},
};
</script>

<style scoped></style>
