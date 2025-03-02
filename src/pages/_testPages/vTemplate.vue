<template>
  <section id="template">
    <div class="container">
      <h1>My First Template</h1>

      <!-- Location-->
      <section class="card card-body border-0 shadow-sm p-4 mb-4" id="location">
        <h2 class="h4 mb-4">
          <i class="fi-map-pin text-primary fs-5 mt-n1 me-2"></i>Location
        </h2>
        <div class="row">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="wifi" checked />
            <label class="form-check-label" for="wifi">Same as on record</label>
          </div>
          <div class="col-sm-6 mb-3">
            <label class="form-label" for="ap-country"
              >Country / region <span class="text-danger">*</span></label
            >
            <select class="form-select" id="ap-country" required>
              <option value="" disabled>Choose country</option>
              <option value="Australia">Australia</option>
              <option value="Belgium">Belgium</option>
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="United States" selected>United States</option>
            </select>
          </div>
          <div class="col-sm-6 mb-3">
            <label class="form-label" for="ap-city"
              >City <span class="text-danger">*</span></label
            >
            <select class="form-select" id="ap-city" required>
              <option value="" disabled>Choose city</option>
              <option value="Chicago">Chicago</option>
              <option value="Dallas">Dallas</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="New York" selected>New York</option>
              <option value="San Diego">San Diego</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-8 mb-3">
            <label class="form-label" for="ap-district"
              >District <span class="text-danger">*</span></label
            >
            <select class="form-select" id="ap-district" required>
              <option value="" disabled>Choose district</option>
              <option value="Brooklyn">Brooklyn</option>
              <option value="Manhattan">Manhattan</option>
              <option value="Staten Island">Staten Island</option>
              <option value="The Bronx">The Bronx</option>
              <option value="Queens" selected>Queens</option>
            </select>
          </div>
          <div class="col-sm-4 mb-3">
            <label class="form-label" for="ap-zip"
              >Zip code <span class="text-danger">*</span></label
            >
            <input
              class="form-control"
              type="text"
              id="ap-zip"
              placeholder="Enter Zip code"
              value="67234"
              required
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="ap-address"
            >Street address <span class="text-danger">*</span></label
          >
          <input
            class="form-control"
            type="text"
            id="ap-address"
            value="28 Jackson Avenue"
            required
          />
        </div>
      </section>

      <!-- Contacts-->
      <section class="card card-body border-0 shadow-sm p-4 mb-4" id="contacts">
        <h2 class="h4 mb-4">
          <i class="fi-phone text-primary fs-5 mt-n1 me-2"></i>Contacts
        </h2>
        <div class="row">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="wifi" checked />
            <label class="form-check-label" for="wifi">Same as on record</label>
          </div>
          <div class="col-sm-6 mb-3">
            <label class="form-label" for="ap-fn"
              >First name <span class="text-danger">*</span></label
            >
            <input
              class="form-control"
              type="text"
              id="ap-fn"
              value="Annette"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div class="col-sm-6 mb-3">
            <label class="form-label" for="ap-sn"
              >Last name <span class="text-danger">*</span></label
            >
            <input
              class="form-control"
              type="text"
              id="ap-sn"
              value="Black"
              placeholder="Enter your second name"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 mb-3">
            <label class="form-label" for="ap-email"
              >Email<span class="text-danger">*</span></label
            >
            <input
              class="form-control"
              type="text"
              id="ap-email"
              value="annette_black@email.com"
              placeholder="Enter your email"
            />
          </div>
          <div class="col-sm-6 mb-3">
            <label class="form-label" for="ap-phone"
              >Phone number <span class="text-danger">*</span></label
            >
            <input
              class="form-control"
              type="tel"
              id="ap-phone"
              data-format="custom"
              data-delimiter="-"
              data-blocks="3 3 4"
              value="302-555-0107"
              placeholder="000-000-0000"
            />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: "MyTemplate",
  props: ["name"],
  components: {},
  data() {
    return {
      id: "",
    };
  },
  methods: {},
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style scoped>
div {
  border-style: solid;
  /* width: 400px; */
}
</style>
