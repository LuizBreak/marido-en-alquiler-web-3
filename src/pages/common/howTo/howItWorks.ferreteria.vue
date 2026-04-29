<template>
  <!-- How it works-->
  <section class="container mb-5 pb-2 pb-lg-4">
    <div class="row gy-5">
      <div class="rounded-3 col-md-5 col-12">
        <h2 class="mb-md-4 text-danger text-center">
          ¿Cansado de la resposabilidad de referir contratistas para los
          clientes?
        </h2>
        <img
          class="rounded-3 d-block mx-5 my-5"
          src="../../../assets/img/gallery/handyman.team.png"
          alt="Illustration"
        />
      </div>
      <div class="col-lg-6 offset-lg-1 col-md-7 col-12">
        <!-- <h2 class="h2 mb-lg-5 mb-sm-2">Ferreterias: ¿Cómo funciona?</h2> -->
        <h3 class="h3 mb-2 pb-1">Cuénte con nosotros</h3>
        <p class="mb-0">
          Ya no necesitas hacerlo.
          <strong>¡Es mucha responsbilidad!</strong> <br /><br />
          Simplemente pasen la voz sobre nuestra plataforma y deja que nosotros
          nos encargamos de esto. Nuestra plataforma tiene cientos de
          contratistas donde los clientes pueden, en base a puntuaciones y
          comentarios de otros clientes, elegir el contratista que mas le
          conviene para su proyecto.
        </p>
        <br />

        <!-- Alternative card style: no border + shadow -->
        <div class="card border-0 shadow">
          <div class="card-body">
            <h5 class="card-title">
              <i
                class="fa fa-bullhorn expand text-primary"
                aria-hidden="true"
              />
              ¡Pasa la voz para tus clientes hoy¡
            </h5>
            <p class="card-text fs-m">
              Aqui puedes poner el
              <strong>nombre y el correo o telefono</strong> de tu cliente para
              que sepa sobre nuestra plataforma.
              <!-- Deja tus clientes y contratistas saber hoy, asi ellos tambien
              pueden beneficiarsen con nuestros servicios. Solo tienes que poner
              su correo y dar enviar. -->
            </p>
            <!-- Form group: Text input + Button -->

            <form
              class="quick-contact-form needs-validation form-group sender mb-5"
              @submit.prevent="notify"
            >
              <div class="input-group w-sm-50 border-end-sm">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Nombre"
                  required
                  v-model="name"
                  @change="SetEmailContent"
                />
              </div>
              <input
                class="form-control"
                type="text"
                placeholder="Ingresa el correo o telefono"
                required
                v-model="phoneOemail"
                @change="SetEmailContent"
              />

              <button type="submit" class="btn btn-primary">
                Enviar<i class="fas fa-paper-plane ms-2" />
              </button>
            </form>
            <div>
              <h5 class="card-title">
                <i class="fi-share expand text-primary" aria-hidden="true" />
                Comparte en tus redes sociales
              </h5>
              <div class="pt-2 text-align-center">
                <ShareNetwork
                  network="facebook"
                  url="https://www.marido-en-alquiler.com/"
                  title="Te lo resolvemos todo."
                  description="Acerca de Marido-en-alquiler: Somos una plataforma de servicio gratuito para ayudar los propietarios a encontrar contratistas que fueron verificados por la plataforma y revisados por otros propietarios en proyectos anteriores."
                  quote="La plataforma de servicios que hacia falta en la Republica Dominicana"
                  hashtags="maridoenalquiler"
                >
                  <a
                    class="btn btn-icon btn-lg btn-light-primary shadow-sm rounded-circle me-2 mb-2"
                    href="#"
                    target="_blank"
                    ><i class="fi-facebook"></i>
                  </a>
                </ShareNetwork>
                <ShareNetwork
                  network="twitter"
                  url="https://www.marido-en-alquiler.com/"
                  title="Te lo resolvemos todo."
                  description="Acerca de Marido-en-alquiler: Somos una plataforma de servicio gratuito para ayudar los propietarios a encontrar contratistas que fueron verificados por la plataforma y revisados por otros propietarios en proyectos anteriores."
                  quote="La plataforma de servicios que hacia falta en la Republica Dominicana"
                  hashtags="maridoenalquiler"
                >
                  <a
                    class="btn btn-icon btn-lg btn-light-primary shadow-sm rounded-circle me-2 mb-2"
                    href="https://www.twitter.com/"
                    target="_blank"
                    ><i class="fi-twitter"></i
                  ></a>
                </ShareNetwork>
                <a
                  class="btn btn-icon btn-lg btn-light-primary shadow-sm rounded-circle me-2 mb-2"
                  href="https://wa.me/+18098930330"
                  target="_blank"
                  ><i class="fi-whatsapp"></i>
                </a>
                <ShareNetwork
                  network="linkedin"
                  url="https://www.marido-en-alquiler.com/"
                  title="Te lo resolvemos todo."
                  description="Acerca de Marido-en-alquiler: Somos una plataforma de servicio gratuito para ayudar los propietarios a encontrar contratistas que fueron verificados por la plataforma y revisados por otros propietarios en proyectos anteriores."
                  quote="La plataforma de servicios que hacia falta en la Republica Dominicana"
                  hashtags="maridoenalquiler"
                >
                  <a
                    class="btn btn-icon btn-lg btn-light-primary shadow-sm rounded-circle me-2 mb-2"
                    href="#"
                    target="_blank"
                    ><i class="fi-linkedin"></i
                  ></a>
                </ShareNetwork>
                <ShareNetwork
                  network="email"
                  url="https://www.marido-en-alquiler.com/"
                  title="Te lo resolvemos todo."
                  description="Acerca de Marido-en-alquiler: Somos una plataforma de servicio gratuito para ayudar los propietarios a encontrar contratistas que fueron verificados por la plataforma y revisados por otros propietarios en proyectos anteriores."
                  quote="La plataforma de servicios que hacia falta en la Republica Dominicana"
                  hashtags="maridoenalquiler"
                >
                  <a
                    class="btn btn-icon btn-lg btn-light-primary shadow-sm rounded-circle me-2 mb-2"
                    href="#"
                    target="_blank"
                    ><i class="fi-mail"></i
                  ></a>
                </ShareNetwork>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <tell-a-friend ref="mytellafriendemailtemplate" v-show="false" />
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../../../utils/types.js";
import { EmailService } from "../../../services/email.services";
import TellAFriend from "../../../components/email/tellaFriend.vue";

export default {
  name: "how-it-works-ferreteria",
  components: { TellAFriend },
  emits: ["child-breadcrumbs-urls"],
  data() {
    return {
      name: "",
      phoneOemail: "",
      email: "hello@target-innovations.com", // process.env.VUE_APP_EMAIL_INBOX, //
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: "/comoclientes",
          caption: "¿Cómo funciona?",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  methods: {
    notify() {
      try {
        const msgData = {
          subject: "Marido-en-alquiler: Referral Program for ",
          name: `Marido-en-alquiler`,
          email: this.phoneOemail,
          mobile: this.phoneOemail,
          messageBody: this.emailContent,
        };

        EmailService.send(msgData);

        this.logIt(
          this?.loggedUser?.id || "visitor",
          "Refer a Friend: " + this.name + " | " + this.phoneOemail || "",
          this.$options.name,
          this.user?.signInUserSession?.idToken?.jwtToken,
          false
        );

        this.phoneOemail = "";
        this.name = "";

        this.triggerMsgBox(
          true,
          "Mensaje enviada con éxito. Gracias por tu indicacion."
        );
      } catch (error) {
        console.log(error);
      }
    },
    async SetEmailContent() {
      await this.$store.dispatch("setEmailAttributes", {
        name: this.name,
        email: this.phoneOemail,
      });
    },
  },
  computed: {
    ...mapGetters([types.LOGGED_USER]),
    emailContent: {
      get() {
        let childEl = this.$refs.mytellafriendemailtemplate.$el.innerHTML;
        return childEl;
      },
    },
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.logIt(
      this?.loggedUser?.id || "visitor",
      "visit: " + this.loggedUser.email || "visitor",
      this.$options.name,
      this.user?.signInUserSession?.idToken?.jwtToken,
      false
    );
  },
  mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
  },
};
</script>
<style scoped>
.sender {
  border: 1px solid rgb(243, 168, 111);
}
.border-end-sm {
  border-right: 1px solid black !important;
}
</style>
