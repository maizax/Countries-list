<template>
  <div>
    <ul>
      <h1>ŠALYS</h1>
      <button class="button" @click="openAddCountry">+</button>
    </ul>
    <add
      :class="{ 'is-active': addCountryActive }"
      @close="closeAddCountry"
      @refresh="getCountries"
      :settings="settings"
      :salis="true"
    />
    <ul class="searchBox">
      <input class="input" type="text" v-model="search" @input="getCountries" />
      <div class="select">
        <select class="select">
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
            <th><abbr title="phone_code">ŠALIES TEL. KODAS</abbr></th>
            <th><abbr title="toDo">VEIKSMAI</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="country in countries.data" :key="country.id">
            <td>
              <router-link :to="{ name: 'Cities', params: { id: country.id } }">
                {{ country.attributes.name }}
              </router-link>
            </td>
            <td>{{ country.attributes.area }}</td>
            <td>{{ country.attributes.population }}</td>
            <td>{{ country.attributes.phone_code }}</td>

            <td class="icons">
              <i class="fa-solid fa-trash solid1" @click="openDeleteCountry(country.id)"></i>
              <i class="fa-solid fa-pencil solid2" @click="openEditCountry(country.id)"></i>
            </td>
          </tr>
        </tbody>
        <delete
          :class="{ 'is-active': deleteCountryActive }"
          @close="closeDeleteCountry"
          @refresh="getCountries"
          :key="countryId"
          :countryId="countryId"
          :settings="settings"
          :salis="true"
        />
        <edit
          :class="{ 'is-active': editCountryActive }"
          @close="closeEditCountry"
          @refresh="getCountries"
          :key="countryId + 'i'"
          :countryId="countryId"
          :settings="settings"
          :salis="true"
        ></edit>
      </table>
    </div>

    <nav class="pagination is-centered is-small">
      <ul class="pagination-list">
        <li v-for="link in countries.meta.links" :key="link.label">
          <a
            @click="setPageNumber(link.url.slice(-1))"
            class="pagination-link"
            :class="{ 'is-current': link.active }"
          > {{ link.label }} </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import Add from "./Add.vue";
import Edit from "./Edit.vue";
import Delete from "./Delete.vue";

export default {
  name: "Countries",
  components: {
    Add,
    Edit,
    Delete
  },
  data() {
    return {
      settings: {
        prideti: "PRIDĖTI ŠALĮ",
        pavadinimas: "Pavadinimas",
        plotas: "Užimamas plotas",
        gyventojai: "Gyventojų skaičius",
        kodas: "Šalies Tel. kodas",
        url: "https://akademija.teltonika.lt/countries_api/api/countries",
        redaguoti: "REDAGUOTI ŠALĮ"
      },
      countries: {},
      pageNumber: "",
      addCountryActive: false,
      editCountryActive: false,
      deleteCountryActive: false,
      countryId: 97,
      deleteCountryId: "",
      search: "",
      url: "https://akademija.teltonika.lt\/countries_api\/api\/countries"
    };
  },
  methods: {
    async getCountries() {
      try {
        const response = await axios
          .get(this.url + "?page=" + this.pageNumber + "&search=" + this.search)
          .then(response => {
            this.countries = response.data;
          });
      } catch (error) {
        this.$toasted.global.error({
          message: "Error fetching data!"
        });
      }
    },
    setPageNumber(value) {
      this.pageNumber = value;
      this.getCountries();
    },
    openAddCountry() {
      this.addCountryActive = true;
    },
    closeAddCountry() {
      this.addCountryActive = false;
    },
    openEditCountry(id) {
      this.editCountryActive = true;
      this.countryId = id;
    },
    closeEditCountry() {
      this.editCountryActive = false;
    },
    openDeleteCountry(id) {
      this.deleteCountryActive = true;
      this.countryId = id;
    },
    closeDeleteCountry() {
      this.deleteCountryActive = false;
    }
  },
  created() {
    this.getCountries();
  }
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
  margin-bottom: 15px;
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
