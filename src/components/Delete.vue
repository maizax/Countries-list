<template>
  <div class="modal">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Ar tikrai norite ištrinti: "{{ data.name }}"?
        </p>
      </header>
      <footer class="modal-card-foot">
        <button class="button" @click="close">ATŠAUKTI</button>
        <button class="button is-danger" @click="del">
          IŠTRINTI
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Delete",
  props: ["countryId", "settings", "salis", "cityId", "deleteActive"],
  data() {
    return {
      data: []
    };
  },
  methods: {
    async getDeleteInfo() {
      if (this.salis) {
        const response = await axios.get(this.settings.url + "/" + this.countryId)
          .then(response => (this.data = response.data.data.attributes));
      } else {
        const response = await axios
          .get(this.settings.url + "/" + this.countryId + "/cities/" + this.cityId)
          .then(response => (this.data = response.data.data.attributes));
      }
    },
    async del() {
      if (this.salis) {
        try {
          const response = await axios.delete(this.settings.url + "/" + this.countryId)
            .then(() => this.$emit("refresh"))
            .then(() => this.close());
          this.$toasted.global.success({
            message: "Deleted successfully!"
          });
        } catch (error) {
          this.$toasted.global.error({
            message: "Cannot delete it!"
          })}
      } else {
        try {
          const response = await axios
            .delete(this.settings.url + "/" + this.countryId + "/cities/" + this.cityId)
            .then(() => this.$emit("refresh"))
            .then(() => this.close());
          this.$toasted.global.success({
            message: "Deleted successfully!"
          });
        } catch (error) {
          this.$toasted.global.error({
            message: "Cannot delete it!"
          });
        }
      }
    },
    close() {
      this.$emit("close");
    }
  },
  created() {
    this.getDeleteInfo();
  }
};
</script>
