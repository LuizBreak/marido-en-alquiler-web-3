<template>
  <!-- Page content-->
  <section class="container">
    <div class="row">
      <div class="col-lg-4 col-md-6">
        <h3 class="mb-md-2 text-normal mx-3">
          <i class="fa fa-bullhorn expand text-primary" aria-hidden="true" />
          Contactanos
        </h3>
        <p class="mb-0 fs-lg text-normal opacity-70 mx-3 mb-4">
          Llenar el formulario y nuestro equipo entrará en contacto contigo en
          las próximas 24 horas.
        </p>
        <div class="d-flex align-items-start mb-4 pb-md-3 quick-contact-form">
          <img
            class="me-3 flex-shrink-0"
            src="../../../img/real-estate/icons/envelope.svg"
            width="32"
            alt="Envelope icon"
          />
          <div>
            <h3 class="h6 mb-2 pb-1 text-normal">Comunicacion General</h3>
            <p class="mb-0 text-normal">
              <span class="opacity-70"
                >Para consultas generales, incluidas las oportunidades de
                socidad, por favor llenar el formulario o envíe un correo
                electrónico para</span
              ><a
                class="ms-1 text-nowrap"
                href="mailto:hello@target-innovations.com"
                >hello@target-innovations.com</a
              >
            </p>
          </div>
        </div>
        <div class="d-flex align-items-start mb-4 pb-md-3 quick-contact-form">
          <img
            class="me-3 flex-shrink-0"
            src="../../../img/real-estate/icons/chat.svg"
            width="32"
            alt="Chat icon"
          />
          <div>
            <h3 class="h6 mb-2 pb-1 text-normal">Servicio al Cliente</h3>
            <p class="mb-0 text-normal">
              <span class="opacity-70"
                >Estamos aquí para ayudarte! Si tienes cualquier problemas
                técnicos contactar nuestro
                <a class="ms-1 text-nowrap" href="/ayuda">Soporte Tecnico</a>
              </span>
            </p>
          </div>
        </div>
        <div class="d-flex align-items-start mb-4 pb-md-3 quick-contact-form">
          <img
            class="me-3 flex-shrink-0"
            src="../../../img/real-estate/icons/map-pin.svg"
            width="32"
            alt="Map pin icon"
          />
          <div>
            <h3 class="h6 mb-2 pb-1 text-normal">Nuestra Sede</h3>
            <p class="mb-0 text-normal">
              <span class="opacity-70"
                >Avenida Independencia, 408 - Gazcue
                <br />
                Distrito Nacional - STO. DGO</span
              ><br /><a class="ms-1 text-nowrap" href="#" data-scroll>mapa</a>
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6 offset-lg-1 mr-5">
        <!-- Contact form-->
        <form class="needs-validation quick-contact-form">
          <div class="mb-4">
            <label class="form-label text-normal" for="firstName">Nombre</label>
            <input
              class="form-control form-control-lg form-control-normal"
              id="firstName"
              type="text"
              required
              :class="v$.firstName.$error ? 'is-invalid' : ''"
              v-model="firstName"
              :disabled="isDisabled"
            />
            <error-list :errors="v$.firstName.$errors"></error-list>
          </div>
          <div class="mb-4">
            <label class="form-label text-normal" for="email">Correo</label>
            <input
              class="form-control form-control-lg form-control-normal"
              id="email"
              type="email"
              required
              :class="v$.email.$error ? 'is-invalid' : ''"
              v-model="email"
              :disabled="isDisabled"
            />
            <error-list :errors="v$.email.$errors"></error-list>
          </div>
          <div class="mb-4">
            <label class="form-label text-normal" for="messageType">Tema</label>
            <select
              class="form-select form-select-lg form-select-normal"
              id="messageType"
              required
              :class="v$.messageType.$error ? 'is-invalid' : ''"
              v-model="messageType"
              @change="SetEmailContent"
            >
              <option :value="null" disabled Selected>-- Elegir Tema --</option>
              <option value="Sociedad">Sociedad</option>
              <option value="Sugerencia">Sugerencia</option>
              <option value="Reclamacion">Reclamacion</option>
            </select>
            <error-list :errors="v$.messageType.$errors"></error-list>
          </div>
          <div class="mb-4">
            <label class="form-label text-normal" for="message">Mensaje</label>
            <textarea
              class="form-control form-control-lg form-control-normal"
              id="message"
              rows="4"
              placeholder="Deje un mensaje"
              required
              :class="v$.message.$error ? 'is-invalid' : ''"
              v-model="message"
              @change="SetEmailContent"
            ></textarea>
            <error-list :errors="v$.message.$errors"></error-list>
          </div>

          <div class="d-grid my-0">
            <button
              class="btn btn-lg btn-primary w-sm-auto w-100 text-right"
              type="submit"
              @click.prevent="submit"
            >
              Enviar<i class="fas fa-paper-plane ms-2"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  <!-- Map location
  <section class="container mb-5 pb-lg-5" id="map-location">
    <div
      class="interactive-map rounded-3"
      data-map-options='{"mapLayer": "https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=5vRQzd34MMsINEyeKPIs", "coordinates": [51.5074, -0.1278], "zoom": 10, "markers": [{"coordinates": [51.5074, -0.1278], "popup": "&lt;div class=&apos;p-3&apos;&gt;&lt;h6&gt;Hi, I&apos;m in London&lt;/h6&gt;&lt;p class=&apos;fs-sm pt-1 mt-n3 mb-0&apos;&gt;Lorem ipsum dolor sit amet elit.&lt;/p&gt;&lt;/div&gt;"}]}'
      style="height: 500px"
    ></div>
  </section>
  -->
  <ContactUsEmail ref="emailcontenttemplate" v-show="false" />
</template>

<script>
import { mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

import DateFormatter from "../../../mixins/dateFormatter.js";
import ErrorList from "../../../components/ui/BaseValidationErrorList.vue";

import { ContactUs } from "../../../services/contactus.service";
import { EmailService } from "../../../services/email.services";
import ContactUsEmail from "../../../components/email/contactUs.email.vue";

const selectionRequired = (value) => value; // if no selected value will be null therefore true

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "contact-us",
  components: { ErrorList, ContactUsEmail },
  mixins: [DateFormatter],
  data() {
    return {
      id: null,
      userId: null,
      firstName: null,
      email: null,
      messageType: null,
      message: null,
      updatedAt: null,
      disabled: 0,
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: "/contactus",
          caption: "Contactanos",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  validations() {
    const requiedMsg = "Campo obligatorio.";
    const invalidEmailMsg = "Correo invalido";
    const selectionRequiredMsg = "Seleccione una opcion valida.";

    return {
      firstName: { required: helpers.withMessage(requiedMsg, required) },
      email: {
        required: helpers.withMessage(requiedMsg, required),
        email: helpers.withMessage(invalidEmailMsg, email),
      },
      messageType: {
        selectionRequired: helpers.withMessage(
          selectionRequiredMsg,
          selectionRequired
        ),
      },
      message: { required: helpers.withMessage(requiedMsg, required) },
    };
  },
  methods: {
    async submit() {
      try {
        const result = await this.v$.$validate();
        if (!result) {
          return;
        }

        const ds = {
          userId: this.loggedUser.id || "0",
          firstName: this.firstName,
          email: this.email,
          messageType: this.messageType,
          message: this.message,
          updatedAt: this.date(Date.now(), "YYYY-MM-DD hh:mm:ss a"),
        };

        this.contactUs = new ContactUs(ds);
        this.contactUs.add().then(() => {
          this.sendMessage();
          this.sysLogIt();
          this.resetForm();
          this.triggerMsgBox(true, "Mensage enviada con éxito.");
        });
      } catch (error) {
        console.log(error);
      }
    },
    resetForm() {
      this.id = null;
      this.userId = null;
      this.firstName = null;
      this.email = null;
      this.messageType = null;
      this.message = null;
      this.updatedAt = null;
      this.disabled = 0;
      this.v$.$reset();
      this.$store.dispatch("setEmailAttributes", {});
    },
    sysLogIt() {
      this.logIt(
        this?.loggedUser?.id,
        "New ContactUs From: " + this.email + " | " + this.message,
        this.$options.name,
        this?.user?.signInUserSession?.idToken?.jwtToken,
        true
      );
    },
    SetEmailContent() {
      this.$store.dispatch("setEmailAttributes", {
        userId: this.loggedUser.id || "0",
        firstName: this.firstName,
        email: this.email,
        messageType: this.messageType,
        message: this.message,
        updatedAt: this.date(Date.now(), "YYYY-MM-DD hh:mm:ss a"),
      });
    },
    async sendMessage() {
      this.SetEmailContent();
      const msgData = {
        subject: "Marido-en-alquiler: ContactUs Message ",
        name: `Marido-en-alquiler`,
        email: this.email,
        mobile: this.email,
        messageBody: this.emailContent,
      };
      await EmailService.send(msgData);
    },
  },
  computed: {
    ...mapGetters(["loggedUser"]),
    isDisabled() {
      return !!this.loggedUser.firstName;
    },
    emailContent: {
      get() {
        let childEl = this.$refs.emailcontenttemplate.$el.innerHTML;
        return childEl;
      },
    },
  },
  created() {
    if (this.loggedUser.firstName !== "") {
      this.firstName = this.loggedUser.firstName;
      this.email = this.loggedUser.email;
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.$emit("child-breadcrumbs-urls", this.urls);
  },
  mounted() {},
};
</script>

<style scoped></style>
