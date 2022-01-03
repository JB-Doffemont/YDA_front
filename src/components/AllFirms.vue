<template>
  <div>
    <h1>Listes des entreprises enregistrées</h1>

    <!-- SEARCH ENTREPRISE -->
    <div>
      <div class="search-wrapper">
        <input
          type="text"
          v-model="search"
          placeholder=" Nom de l'entreprise ..."
        />
      </div>
    </div>
    <!-- END SEARCH ENTREPRISE -->

    <!--v-for pour afficher tout les entreprises en BDD -->

    <table class="array">
      <thead class="head">
        <tr class="trHead">
          <th>Logo:</th>

          <th>Nom:</th>

          <th>Adress:</th>

          <th>Téléphone:</th>

          <th>E-mail:</th>

          <th>Visite 1:</th>

          <th>Visite 2:</th>

          <th>Modifier/Supprimer</th>
        </tr>
      </thead>

      <!-- affichage de tous les utilisateurs -->

      <tbody
        v-for="(entreprise, index) in filteredList"
        :key="index"
        class="body"
      >
        <tr>
          <td @click="getUsersByFirm(entreprise.id)">
            <img :src="`http://localhost:8000/img/logos/` + entreprise.logo" />
          </td>

          <td>{{ entreprise.name }}</td>

          <td>{{ entreprise.address }}</td>

          <td>{{ entreprise.phone }}</td>

          <td>{{ entreprise.email }}</td>

          <td>{{ entreprise.visit_day_1 }}, {{ entreprise.time_1 }} H</td>

          <td>{{ entreprise.visit_day_2 }}, {{ entreprise.time_2 }} H</td>

          <td v-if="this.role.value == 'admin'">
            <i @click="getFirmById(entreprise.id)" class="fas fa-pen"></i>

            <i @click="deleteFirm(entreprise.id)" class="far fa-trash-alt"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  inject: ["role"],

  data() {
    return {
      firmList: [],
      idFirm: "",
      search: "",
    };
  },
  computed: {
    filteredList() {
      return this.firmList.filter((entreprise) => {
        return entreprise.name
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },

  async mounted() {
    /*requete pour récuperer au montage tout les entreprises en BDD*/
    const url = "http://127.0.0.1:8000/api/firms";
    //Options de la requête API
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("@token"),
        Accept: "application/json",
      },
    };
    // va chercher les options de l'API
    const response = await fetch(url, options);
    console.log(response);
    // la récupération des data stockées dans l'API
    const data = await response.json();
    console.log(data);

    this.firmList = data;
    console.log(this.firmList);
  },
  methods: {
    async deleteFirm(id) {
      const url = `http://127.0.0.1:8000/api/firms/${id}`;

      const options = {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);

      let i = this.firmList.map((item) => item.id).indexOf(id); // find index of your object
      this.firmList.splice(i, 1); // remove it from array
      this.$router.push({ name: "AllFirms" });
    },

    async getUsersByFirm(id) {
      this.$router.push({
        name: "Users",
        params: { firmId: id },
      });
    },
    async getFirmById(id) {
      this.$router.push({
        name: "EditFirm",
        params: { firmId: id },
      });
    },
  },
};
</script>

<style scoped>
table {
  overflow: hidden;
  width: 100%;
}

.arrayUsers .array {
  border: 1px solid #bdc3d7;
  text-align: center;
  vertical-align: middle;
  /* position: absolute;
  left: 50%;
  top: 150%;
  transform: translate(-50%, -50%); */
  border-collapse: collapse;
  width: 100%;
  height: 200px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);
}

.array tr {
  background-color: #f39c11;
  transition: all 0.2s ease-in;
  background-color: #fff;
  cursor: pointer;
}

.array th,
td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  min-width: 100px;
  max-height: 30px;
}

.array .trHead {
  background-color: #f39c11;
  font-weight: bold;
  color: #fff;
}

tbody tr:hover {
  background-color: #f5f5f5;
  transform: scale(1.02);
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);
}

.title_description {
  margin-left: 5%;
}

img {
  width: 100px;
  height: 100px;
}

i {
  width: 50px;
}

/************** CSS SEARCH ****************/
input[type="text"] {
  font-size: 24px;
}
</style>
