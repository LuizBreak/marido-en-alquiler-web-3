<template>
  <section id="template">
    <div class="card mx-5 my-5 p-sm-5 border-3 shadow-sm">
      <div class="card-body">
        <h3 class="text-center">POLITICAS DE PRIVACIDAD</h3>
        <div class="privacy-wrapper">
          <div class="privacy-title my-3 text-danger">BIENVENIDO/A</div>
          <div class="privacy-desc">
            Bienvenido a la comunidad Marido-en-alquiler, un portal que permite
            a sus miembros comprar ofertas increíbles, crear perfiles personales
            exclusivos en línea, así como divertirse, participar y compartir
            diferentes actividades y opiniones. El acceso o uso de esta
            comunidad interactiva (en adelante el PORTAL) implica la aceptación
            sobre la lectura, el entendimiento y el acuerdo con las siguientes
            <strong>POLITICAS DE PRIVACIDAD</strong>. Marido-en-alquiler es una
            marca de Target Innovations S.R.L (en adelante LA EMPRESA) se
            reserva el derecho de cambiar, modificar, adicionar o eliminar total
            o parcialmente las presentes
            <strong>POLITICAS DE PRIVACIDAD</strong>, a su libre discreción.
          </div>
        </div>
        <div class="privacy-note">
          Por favor lea los siguientes términos cuidadosamente.
        </div>
        <div class="privacy-wrapper">
          <div class="privacy-title my-3 text-danger">
            POLÍTICAS DE SEGURIDAD
          </div>
          <div class="privacy-desc">
            <strong>WEBSITE</strong>
            <br />
            Tomamos todas las medidas y precauciones razonables para proteger tu
            información personal y seguimos las mejores prácticas de la
            industria para asegurar que tu información no sea utilizada de
            manera inapropiada, alterada o destruida.
            <br />
            Ciframos la información de tu tarjeta de crédito utilizando la
            tecnología de capa de puertos seguros o Secure Sockets Layer (SSL),
            y la almacenamos con el cifrado AES-256. También, seguimos todos los
            requerimientos del PCI-DSS.
            <br />
            <br />
            <strong>PAGOS</strong> <br />
            Los métodos de pago utilizados por Marido-en-alquiler son servicios
            de terceros. Estos servicios de terceros (AZUL), cumplen con todos
            los estándares de seguridad y cifrado para mantener tu información
            segura. Solo utilizarán la información necesaria para completar el
            proceso requerido. <br />
            También recomendamos leer las políticas de privacidad de estos
            proveedores, para entender mejor cómo manejan su información
            suministrada.
            <br /><br />
            Su información está protegida. Empleamos los más altos estándares en
            seguridad para proteger su información personal y la de su tarjeta
            de crédito.
          </div>
        </div>
        <div class="privacy-wrapper">
          <div class="privacy-title my-3 text-danger">
            POLÍTICAS DE PRIVACIDAD
          </div>
          <div class="privacy-desc">
            <strong>El USUARIO</strong> acepta que los riesgos que se deriven de
            la publicación de su Contenido en el <strong>PORTAL</strong> corren
            bajo su propio riesgo, teniendo en cuenta que el
            <strong>OPERADOR</strong> del <strong>PORTAL</strong> concederá al
            usuario opciones de privacidad sobre alguna de la información
            suministrada, sin que con ello pueda garantizar la inviolabilidad o
            impenetrabilidad por parte de terceros. <br /><br />
            El <strong>OPERADOR</strong> del <strong>PORTAL</strong> no se hace
            responsable por ninguna violación a las configuraciones de
            privacidad o a las medidas de seguridad contenidas en el
            <strong>PORTAL</strong>. Cualquier recopilación indebida o mal uso
            de la información proporcionada al <strong>PORTAL</strong> deberá
            ser notificada a
            <strong
              ><a
                href="/cdn-cgi/l/email-protection"
                class="__cf_email__"
                data-cfemail="72111d1c061311061d321f1715070106135c161d"
                >[email&#160;protected]</a
              ></strong
            >. <strong>El PORTAL</strong> podrá contener enlaces a otros sitios
            web, los cuales contienen políticas de privacidad y términos de
            condiciones específicas, por lo cual <strong>EL USUARIO</strong> es
            responsable de leer las condiciones correspondientes y aceptar o
            abstenerse de hacerlo si lo considera conveniente.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "privacy-policy",
  components: {},
  data() {
    return {
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: "/privacidad",
          caption: "Política de Privacidad",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  methods: {},
  computed: {},
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.$emit("child-breadcrumbs-urls", this.urls);
  },
  mounted() {},
};
</script>

<style scoped></style>
