<template>
  <div class="modal">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ settings.nameOfHeader }}</p>
        <button class="delete" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">{{ settings.nameOfNewElement }}</label>
          <input class="input" v-model="name" type="text" required />
        </div>
        <div class="field">
          <label class="label">{{ settings.areaOfNewElement }}</label>
          <input class="input" v-model="area" type="number" min="0" required />
        </div>
        <div class="field">
          <label class="label">{{ settings.populationOfNewElement }}</label>
          <input
            class="input"
            v-model="population"
            type="number"
            min="0"
            required
          />
        </div>
        <div class="field" v-if="isCountry">
          <label class="label">{{ settings.codeOfNewElement }}</label>
          <input class="input" v-model="phone_code" type="tel" required />
        </div>
        <div class="field" v-else>
          <label class="label">{{ settings.codeOfNewElement }}</label>
          <input class="input" v-model="postal_code" type="tel" required />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="add">
          SAUGOTI
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Add",
  props: ["settings", "isCountry", "countryId"],
  data() {
    return {
      name: "",
      area: "",
      population: "",
      phone_code: "",
      postal_code: "",
      visible: true,
    };
  },
  methods: {
    async add() {
      if (this.isCountry) {
        try {
          await axios
            .post(this.settings.url, {
              data: {
                attributes: {
                  name: this.name,
                  area: this.area,
                  population: this.population,
                  phone_code: this.phone_code,
                },
              },
            })
            .then(() => this.$emit("refresh"))
            .then(() => this.close());
          this.$toasted.global.success({
            message: "Added successfully!",
          });
        } catch (error) {
          this.$toasted.global.error({
            message: "Please fill all fields!",
          });
        }
      } else {
        try {
          await axios
            .post(this.settings.url + "/" + this.countryId + "/cities", {
              data: {
                attributes: {
                  name: this.name,
                  area: this.area,
                  population: this.population,
                  postal_code: this.postal_code,
                },
              },
            })
            .then(() => this.$emit("refresh"))
            .then(() => this.close());
          this.$toasted.global.success({
            message: "Added successfully!",
          });
        } catch (error) {
          this.$toasted.global.error({
            message: "Please fill all fields!",
          });
        }
      }
    },
    close() {
      this.resetFields();
      this.$emit("close");
    },
    resetFields() {
      this.name = "";
      this.area = "";
      this.population = "";
      this.phone_code = "";
      this.postal_code = "";
    },
  },
};
</script>
