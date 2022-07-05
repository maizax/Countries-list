<template>
  <div class="modal">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ settings.redaguoti }}</p>
        <button class="delete" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">{{ settings.pavadinimas }}</label>
          <input class="input" v-model="data.name" type="text" required />
        </div>
        <div class="field">
          <label class="label">{{ settings.plotas }}</label>
          <input class="input" v-model="data.area" type="number" required />
        </div>
        <div class="field">
          <label class="label">{{ settings.gyventojai }}</label>
          <input class="input" v-model="data.population" type="number" required />
        </div>
        <div class="field" v-if="salis">
          <label class="label">{{ settings.kodas }}</label>
          <input class="input" v-model="data.phone_code" type="tel" required />
        </div>
        <div class="field" v-else>
          <label class="label">{{ settings.kodas }}</label>
          <input class="input" v-model="data.postal_code" type="tel" required />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="update">
          SAUGOTI
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Edit",
  props: ["countryId", "settings", "salis", "cityId", "editCityActive"],
  data() {
    return {
      data: []
    };
  },
  methods: {
    async getEditInfo() {
      if (this.salis) {
        const response = await axios.get(this.settings.url + "/" + this.countryId)
          .then(response => (this.data = response.data.data.attributes));
      } else {
        const response = await axios.get(this.settings.url + "/" + this.countryId + "/cities/" + this.cityId)
          .then(response => (this.data = response.data.data.attributes));
      }
    },
    async update() {
      if (this.salis) {
        try {
          const response = await axios
            .put(this.settings.url + '/' + this.countryId, {
              data: {
                attributes: {
                  name: this.data.name,
                  area: this.data.area,
                  population: this.data.population,
                  phone_code: this.data.phone_code
                }
              }
            })
            .then(() => this.$emit("refresh"))
            .then(() => this.close());
          this.$toasted.global.success({
            message: "Edited successfully!"
          });
        } catch (error) {
          this.$toasted.global.error({
            message: "Please fill all fields!"
          });
        }
      } else {
        try {
          const response = await axios
            .put(this.settings.url + '/' + this.countryId + "/cities/" + this.cityId, {
              data: {
                attributes: {
                  name: this.data.name,
                  area: this.data.area,
                  population: this.data.population,
                  postal_code: this.data.postal_code
                }
              }
            })
            .then(() => this.$emit("refresh"))
            .then(() => this.close());
          this.$toasted.global.success({
            message: "Edited successfully!"
          });
        } catch (error) {
          this.$toasted.global.error({
            message: "Please fill all fields!"
          });
        }
      }
    },
    close() {
      this.$emit("close");
    }
  },
  created() {
    this.getEditInfo();
  }
};
</script>
