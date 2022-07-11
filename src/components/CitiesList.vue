<template>
  <div>
    <ul>
      <h1>MIESTAI</h1>
      <button class="button" @click="openAddCity">+</button>
    </ul>
    <add
      :class="{ 'is-active': addCityActive }"
      @close="closeAddCity"
      @refresh="getCities"
      :countryId="countryId"
      :settings="cityModalInfo"
      :isCountry="false"
    />
    <ul class="searchBox">
      <div>
        <input class="input" type="text" v-model="search" @input="getCities" />
      </div>
      <div class="select">
        <select>
          <option>DATA FILTER</option>
        </select>
      </div>
    </ul>
    <div class="border">
      <table class="table is-hoverable">
        <thead>
          <tr>
            <th><abbr title="name">PAVADINIMAS</abbr></th>
            <th><abbr title="area">UŽIMAMAS PLOTAS</abbr></th>
            <th><abbr title="population">GYVENTOJŲ SKAIČIUS</abbr></th>
            <th><abbr title="postal_code">MIESTO PAŠTO KODAS</abbr></th>
            <th><abbr title="toDo">VEIKSMAI</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="city in cities.data" v-bind:key="city.id">
            <td>{{ city.attributes.name }}</td>
            <td>{{ city.attributes.area }}</td>
            <td>{{ city.attributes.population }}</td>
            <td>{{ city.attributes.postal_code }}</td>

            <td class="icons">
              <i
                class="fa-solid fa-trash solid1"
                @click="openDeleteCity(city.id)"
              ></i>
              <i
                class="fa-solid fa-pencil solid2"
                @click="openEditCity(city.id)"
              ></i>
            </td>
          </tr>
        </tbody>
        <delete
          :class="{ 'is-active': deleteCityActive }"
          @close="closeDeleteCity"
          @refresh="getCities"
          :key="cityId"
          :cityId="cityId"
          :countryId="countryId"
          :deleteCityActive="deleteCityActive"
          :settings="cityModalInfo"
          :isCountry="false"
        />
        <edit
          :class="{ 'is-active': editCityActive }"
          @close="closeEditCity"
          @refresh="getCities"
          :key="cityId + 'i'"
          :cityId="cityId"
          :countryId="countryId"
          :editCityActive="editCityActive"
          :settings="cityModalInfo"
          :isCountry="false"
        />
      </table>
    </div>
    <nav class="pagination is-centered is-small">
      <ul class="pagination-list">
        <li v-for="link in cities.meta.links" :key="link.label">
          <a
            @click="setCityPage(link.url.slice(-1))"
            class="pagination-link"
            :class="{ 'is-current': link.active }"
            aria-label="Goto page"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Add from "./Add.vue";
import Edit from "./Edit.vue";
import Delete from "./Delete.vue";
import axios from "axios";

export default {
  name: "Cities",
  components: {
    Add,
    Edit,
    Delete,
  },

  data() {
    return {
      cityModalInfo: {
        nameOfHeader: "PRIDĖTI MIESTĄ",
        nameOfNewElement: "Pavadinimas",
        areaOfNewElement: "Užimamas plotas",
        populationOfNewElement: "Gyventojų skaičius",
        codeOfNewElement: "Miesto pašto kodas",
        url: "https://akademija.teltonika.lt/countries_api/api/countries",
        nameOfEditingElement: "REDAGUOTI MIESTĄ"
      },
      cities: [],
      countryId: this.$route.params.id,
      pageNumber: "",
      addCityActive: false,
      editCityActive: false,
      deleteCityActive: false,
      search: "",
      cityId: "",
    };
  },
  methods: {
    async getCities() {
      try {
       await axios
          .get(
            this.cityModalInfo.url +
              "/" +
              this.countryId +
              "/cities?page=" +
              this.pageNumber +
              "&search=" +
              this.search
          )
          .then((response) => (this.cities = response.data));
      } catch (error) {
        this.$toasted.global.error({
          message: "Error fetching data!",
        });
      }
    },
    setCityPage(value) {
      this.pageNumber = value;
      this.getCities();
    },
    openAddCity() {
      this.addCityActive = true;
    },
    closeAddCity() {
      this.addCityActive = false;
    },
    openEditCity(id) {
      this.editCityActive = true;
      this.cityId = id;
    },
    closeEditCity() {
      this.editCityActive = false;
    },
    openDeleteCity(id) {
      this.deleteCityActive = true;
      this.cityId = id;
    },
    closeDeleteCity() {
      this.deleteCityActive = false;
    },
  },
  created() {
    this.getCities();
  },
};
</script>

<style scoped>
.table {
  width: 1185px;
}
table {
  border-collapse: collapse;
  border-style: hidden;
}
table td {
  border: 1px solid black;
  text-align: left;
}
table th {
  border: 1px solid black;
}
.border {
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.button {
  font-size: 15px;
  border-radius: 100%;
  margin-left: 15px;
}
ul {
  display: flex;
  align-items: center;
}
h1 {
  font-size: 64px;
}
.icons {
  font-size: 20px;
  text-align: center;
}
.fa-solid {
  cursor: pointer;
}
.solid2 {
  margin-left: 30px;
}
.searchBox {
  margin-bottom: 20px;
}
.input {
  width: 1050px;
  margin-right: 30px;
  background: url("/src/assets/search-icon.svg") no-repeat 1000px;
  background-size: 20px 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.select {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
