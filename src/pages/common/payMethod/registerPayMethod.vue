<template>
  <div class="col-lg-8 col-md-7 mb-5">
    <h2 class="h2 mb-0">
      <i class="fi-credit-card expand text-primary" aria-hidden="true" />
      Formas de Pago
    </h2>
    <p class="pt-1">
      Agrega y administra tus formas de pago con nuestro sistema de pago seguro.
    </p>

    <form class="needs-validation pb-4 quick-contact-form" novalidate>
      <h2 class="h4 mb-4">
        <i class="fi-credit-card text-primary fs-5 mt-n1 me-2"></i>Datos de la
        Tarjeta
      </h2>
      <!-- Format: Credit card number -->
      <div class="mb-3">
        <label class="form-label" for="format-card-number"
          >Numero de tarjeta <span class="text-danger">*</span></label
        >
        <cleave
          class="form-control"
          type="text"
          id="format-card-number"
          data-format="card"
          placeholder="0000-0000-0000-00000"
          :class="v$.cardNumber.$error ? 'is-invalid' : ''"
          v-model="cardNumber"
          :options="{
            creditCard: true,
            delimiter: '-',
          }"
        />
        <div
          class="input-errors text-danger"
          v-for="error of v$.cardNumber.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div class="row mb-3">
        <!-- Credit card CVC -->
        <div class="col-sm-3 mb-3">
          <label class="form-label" for="format-card-cvc"
            >Codigo CVV <span class="text-danger">*</span></label
          >
          <cleave
            class="form-control"
            type="text"
            id="format-card-cvc"
            data-format="cvc"
            placeholder="123"
            :class="v$.cvc.$error ? 'is-invalid' : ''"
            v-model="cvc"
            :options="{
              numeral: true,
              numeralPositiveOnly: true,
              numeralIntegerScale: 3,
            }"
          />
          <div
            class="input-errors text-danger"
            v-for="error of v$.cvc.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <!-- Caducidad - Month -->
        <div class="col-sm-4 mb-3">
          <label class="form-label" for="format-month"
            >Caducidad <span class="text-danger">*</span></label
          >
          <cleave
            class="form-control"
            type="text"
            id="format-month"
            placeholder="mm"
            style="width: 100%"
            :class="v$.expireMonth.$error ? 'is-invalid' : ''"
            v-model="expireMonth"
            :options="{ date: true, datePattern: ['m'] }"
          />
          <div
            class="input-errors text-danger"
            v-for="error of v$.expireMonth.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <!-- Caducidad - Year -->
        <div class="col-sm-5 mb-3">
          <label class="form-label" for="format-year">
            &zwnj;
            <!-- <span style="opacity: 0">This Caducidad is invisible</span> -->
          </label>
          <cleave
            class="form-control"
            type="text"
            id="format-year"
            placeholder="yyyy"
            style="width: 100%"
            :class="v$.expireYear.$error ? 'is-invalid' : ''"
            v-model="expireYear"
            :options="{ date: true, datePattern: ['Y'] }"
          />
          <div
            class="input-errors text-danger"
            v-for="error of v$.expireYear.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <!-- Postal Code -->
        <div class="col-sm-6 mb-3">
          <label class="form-label" for="postal-code"
            >Codigo Postal <span class="text-danger">*</span></label
          >
          <input
            class="form-control"
            type="text"
            id="postal-code"
            placeholder=""
            required
            :class="v$.postalCode.$error ? 'is-invalid' : ''"
            v-model="postalCode"
          />
          <div
            class="input-errors text-danger"
            v-for="error of v$.postalCode.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <!-- Country -->
        <div class="col-sm-6 mb-3">
          <label class="form-label" for="country"
            >Pais <span class="text-danger">*</span></label
          >
          <select
            class="form-select"
            id="country"
            v-model="country"
            :class="v$.country.$error ? 'is-invalid' : ''"
            required
          >
            <option :value="null" disabled>--- Eligir Pais ---</option>
            <option value="Republic Dominicana">Republic Dominicana</option>
            <option value="Haiti">Haiti</option>
            <option value="Canada">Canada</option>
            <option value="Estado Unidos" selected>Estado Unidos</option>
          </select>
          <div
            class="input-errors text-danger"
            v-for="error of v$.country.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>
      <!-- Action buttons -->
      <section class="d-sm-flex justify-content-between pt-2">
        <a
          class="btn btn-primary btn-lg d-block mb-2"
          @click.prevent="save"
          href="#"
          >Grabar</a
        >
      </section>

      <!-- Lista de Tarjetas Registradas -->
      <div
        class="border-top pt-4 mt-3 quick-contact-form"
        v-if="hasPayMethods && !isLoading"
      >
        <h2 class="h5 pt-2 mb-4">Lista de Tarjetas Registradas</h2>
        <div
          class="d-flex border-bottom pb-3 mb-3"
          v-for="method in payMethods"
          :key="method.payMethodId"
          :id="method.payMethodId"
        >
          <i class="fi-credit-card fs-5 text-muted me-1"></i>
          <div class="ps-2">
            <div class="fw-bold mb-1">
              Numero de Tarjeta:
              <span class="fw-normal mb-1">
                **** {{ method.cardNumber.substr(-4) }}</span
              >
            </div>
            <span class="d-inline-block fs-sm fw-bold border-end pe-2 me-2"
              >Caducidad:
              <span class="fw-normal mb-1"
                >{{ method.expireMonth }}/{{ method.expireYear }}
              </span>
              <span class="fs-sm fw-bold text-success"> Active now</span></span
            >
          </div>
          <div class="align-self-center ms-auto">
            <div class="dropdown">
              <button
                class="btn btn-icon btn-light btn-xs rounded-circle shadow-sm"
                type="button"
                id="contextMenu1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fi-dots-vertical"></i>
              </button>
              <ul
                class="dropdown-menu pb-3 my-1"
                aria-labelledby="contextMenu1"
              >
                <!-- <li>
                  <a class="dropdown-item text-body" href="#">Not you?</a>
                </li> -->
                <li><a class="d-block px-3" href="#">Borrar Tarjeta</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

import { PayMethod } from "../../../services/payMethod.service";
import DateFormatter from "../../../mixins/dateFormatter.js";
import msgBoxDialog from "../../../mixins/msgBoxDialog.js";

// https://www.npmjs.com/package/vue-cleave-component
import Cleave from "vue-cleave-component";

const selectionRequired = (value) => value; // if no selected value will be null therefore true

const maxLength3 = helpers.regex(/^[0-9]{3}$/);
const maxLength15 = helpers.regex(/^[0-9]{15}$/);

// Option #1: Regex for Expire date
// const validExpirationDate = helpers.regex(
//   /^(0[1-9]|1[0-2]|[1-9])\/(1[4-9]|[2-9][0-9]|20[1-9][1-9])$/
// );

// const validateExpirationRegEx = function (param) {
//   console.log("param:", [param]);
//   return (value, param) => {
//     console.log("param, value:", param.expireMonth + "/" + value);
//     return validExpirationDate(param.expireMonth + "/" + value);
//   };
// };

// Option #2: Vanilla JavaScrip
const validExpirationDate = function (param) {
  console.log("param:", [param]);
  return (value, param) => {
    let today = new Date();
    let someday = new Date();
    someday.setFullYear(value, param.expireMonth, 1);

    if (someday < today) {
      return false;
    } else {
      return true;
    }
  };
};

export default {
  setup() {
    const dt = ref(new Date());
    const format = (dt) => {
      const day = dt.getDate();
      const month = dt.getMonth() + 1;
      const year = dt.getFullYear();
      return `${day}/${month}/${year}`;
    };
    return { v$: useVuelidate(), dt, format };
  },
  emits: ["trigger-msg-box", "child-breadcrumbs-urls"],
  name: "register-pay-method",
  mixins: [DateFormatter, msgBoxDialog],
  components: { Cleave },
  data() {
    return {
      isLoading: false,
      payMethod: null,
      cardNumber: null,
      cvc: null,
      expireMonth: null,
      expireYear: null,
      postalCode: null,
      country: null,
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: this.isClient ? "/perfil" : "/profile",
          caption: "Cuenta",
          isActive: false,
          aria: "",
        },
        {
          url: "/formas-pago",
          caption: "Formas de Pago",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  validations() {
    const requiedMsg = "Campo obligatorio.";
    const invalidExpireDateMsg = "Fecha de caducidad Invalida.";
    const selectionRequiredMsg = "Seleccione una opcion valida.";
    const maxLength3Msg = "Number deve tener 3 digitos.";
    const maxLength16Msg = "Number deve tener 15 digitos.";

    return {
      cardNumber: {
        required: helpers.withMessage(requiedMsg, required),
        maxLength15: helpers.withMessage(maxLength16Msg, maxLength15),
      },
      cvc: {
        required: helpers.withMessage(requiedMsg, required),
        maxLength3: helpers.withMessage(maxLength3Msg, maxLength3),
      },
      expireMonth: { required: helpers.withMessage(requiedMsg, required) },
      expireYear: {
        required: helpers.withMessage(requiedMsg, required),
        validExpirationDate: helpers.withMessage(
          invalidExpireDateMsg,
          validExpirationDate(this.expireMonth)
        ),
      },
      postalCode: { required: helpers.withMessage(requiedMsg, required) },
      country: {
        selectionRequired: helpers.withMessage(
          selectionRequiredMsg,
          selectionRequired
        ),
      },
    };
  },
  directives: {
    cleave: {
      inserted: (el, binding) => {
        el.cleave = new Cleave(el, binding.value || {});
      },
      update: (el) => {
        const event = new Event("input", { bubbles: true });
        setTimeout(function () {
          el.value = el.cleave.properties.result;
          el.dispatchEvent(event);
        }, 100);
      },
    },
  },
  methods: {
    async save() {
      this.payMethod = new PayMethod(
        this.userId,
        this.cardNumber,
        this.cvc,
        this.expireMonth,
        this.expireYear,
        this.date(Date.now(), "YYYY-MM-DD hh:mm:ss a")
      );

      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      try {
        this.payMethod.add();
        this.resetForm();
        this.triggerMsgBox(true, "registro realizado con éxito.");
      } catch (error) {
        this.triggerMsgBox(true, "Erro al registrar le metodo de pago.");
      }
    },
    // triggerMsgBox: function (showIt, message) {
    //   this.$store.dispatch("triggerMsgBox", {
    //     showIt,
    //     message,
    //   });
    // },
    resetForm() {
      this.payMethod = null;
      this.cardNumber = null;
      this.cvc = null;
      this.expireMonth = null;
      this.expireYear = null;
      this.postalCode = null;
      this.country = null;
      this.v$.$reset();
    },
    async refreshPayMethodList() {
      this.isLoading = true;
      this.payMethod = new PayMethod(
        this.userId,
        this.cardNumber,
        this.cvc,
        this.expireMonth,
        this.expireYear,
        this.date(Date.now(), "YYYY-MM-DD hh:mm:ss a")
      );
      await this.payMethod.getByClientId(this.userId);
      this.isLoading = false;
    },
  },
  computed: {
    hasPayMethods() {
      return this.payMethod.hasPayMethods();
    },
    payMethods() {
      return this.payMethod.payMethods();
    },
    userId() {
      return this.$store.getters["userId"];
    },
  },
  async created() {
    this.$emit("child-breadcrumbs-urls", this.urls);
    await this.refreshPayMethodList();
  },
  mounted() {},
};
</script>

<style scoped>
.text-label {
  background: rgba(0, 0, 0, 0);
  border: none;
}
</style>
