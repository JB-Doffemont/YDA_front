<template>
  <NavbarreAdmin />
  <h2>Compte {{ this.name }}</h2>

  <div class="firm_details">
    <div class="part_1">
      <div>
        <p>Raison Sociale :{{ this.name }}</p>
      </div>
      <div>
        <p>
          Adresse :
          {{ this.address }}
        </p>
      </div>
    </div>

    <div class="part_1">
      <div>
        <p><i class="fas fa-phone-alt"></i> {{ this.phone }}</p>
      </div>
      <div>
        <p><i class="fas fa-at"></i> {{ this.email }}</p>
      </div>
    </div>

    <div>
      <p>Siret : {{ this.siret }}</p>
    </div>
  </div>

  <h2>Actualité</h2>
  <div>
    <div class="news">
      <div>
        <img :src="`http://localhost:8000/img/news/` + this.image" />
      </div>
      <div>
        <p>Actualité du moment : {{ this.title }}</p>
        <p>{{ this.news }}</p>
      </div>
    </div>
  </div>

  <h2>Listes des commandes</h2>
  <div class="orders">
    <div class="orders_thead">
      <div class="orders_tr">
        <div class="orders_div_head">
          <p class="orders_th">Commande n°</p>
          <p class="orders_th">Statut</p>
          <p class="orders_th">Date création</p>
          <p class="orders_th">Date dernière modification</p>
          <p class="orders_th">
            Entreprises:<SelectFirms @change="getFirmValue($event)" />
          </p>
          <p class="orders_th">Nom salarié</p>
          <p>Modifier statut</p>
        </div>
      </div>
    </div>

    <!-- affichage de tous les utilisateurs -->

    <div class="orders_thead" v-for="(firm, index) in usersFirms" :key="index">
      <div class="orders_tr" v-for="(value, index) in firm.users" :key="index">
        <div
          class="orders_div_body"
          v-for="(order, index) in value.orders"
          :key="index"
        >
          <p class="orders_td">{{ order.id }}</p>
          <p class="orders_td">{{ order.status }}</p>
          <p class="orders_td">
            {{ moment(order.created_at).format("DD MMM YYYY, HH:mm ") }}
          </p>
          <p class="orders_td">
            {{ moment(order.updated_at).format("DD MMM YYYY, HH:mm ") }}
          </p>
          <p class="orders_td">{{ firm.name }}</p>
          <p class="orders_td">{{ value.firstname }} {{ value.lastname }}</p>
          <i
            class="fas fa-pen form_td"
            v-show="!showEdit"
            @click="showEdit = !showEdit"
          ></i>
          <form
            @submit.prevent="editStatus(order.id)"
            v-show="showEdit"
            class="form_td"
          >
            <select v-model="status">
              <option value="">Statuts</option>
              <option value="en cours">En cours</option>
              <option value="en attente">En attente</option>
              <option value="terminée">Terminées</option>
            </select>
            <button><i class="fas fa-check"></i></button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <h2>Utilisateurs</h2>

  <div class="arrayUsers">
    <table class="array">
      <thead class="head">
        <tr class="trHead">
          <th>Nom :</th>

          <th>Prenom :</th>

          <th>Date de naissance :</th>

          <th>E-mail :</th>

          <th>Téléphone :</th>

          <th>Role :</th>

          <th>Commentaire :</th>

          <th>Action :</th>
        </tr>
      </thead>

      <!-- affichage de tous les utilisateurs -->

      <tbody v-for="(firm, index) in usersFirms" :key="index">
        <tr v-for="(value, index) in firm.users" :key="index">
          <td>{{ value.firstname }}</td>

          <td>{{ value.lastname }}</td>

          <td>{{ value.birthday }}</td>

          <td>{{ value.email }}</td>

          <td>{{ value.phone }}</td>

          <td>{{ value.role }}</td>

          <td>{{ value.comments }}</td>

          <td>
            <i class="fas fa-pen" @click="getUserProfil(value.id)"></i>
            <i @click="deleteUser(value.id)" class="far fa-trash-alt"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NavbarreAdmin from "../components/NavbarreAdmin.vue";
import moment from "moment";
export default {
  inject: ["role"],
  props: {
    firmId: String,
  },

  created: function () {
    this.moment = moment;
  },
  components: {
    NavbarreAdmin: NavbarreAdmin,
  },

  data() {
    return {
      usersFirms: [],
      name: "",
      address: "",
      phone: "",
      email: "",
      siret: "",
      title: "",
      news: "",
      image: "",
      id: this.firmId,
      idUser: "",
      showEdit: false,
    };
  },

  async mounted() {
    /*requete pour récuperer au montage tout les entreprises en BDD*/
    const url = `http://127.0.0.1:8000/api/firms/${this.id}`;
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

    this.usersFirms = data.tab_firms;

    const arrayFirms = data.tab_firms;

    this.name = arrayFirms[0].name;
    this.phone = arrayFirms[0].phone;
    this.address = arrayFirms[0].address;
    this.email = arrayFirms[0].email;
    this.siret = arrayFirms[0].siret;
    this.title = arrayFirms[0].title;
    this.news = arrayFirms[0].news;
    this.image = arrayFirms[0].image;
  },

  methods: {
    async editUser(id) {
      const url = `http://127.0.0.1:8000/api/users/${id}`;
      //Options de la requête API
      const options = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
      };
      // va chercher les options de l'API
      const response = await fetch(url, options);
      console.log(response);
      // la récupération des data stockées dans l'API
      const data = await response.json();
      console.log(data);

      this.$router.push({ name: "Connexion" });
    },

    async getUserProfil(id) {
      this.$router.push({
        name: "EditProfil",
        params: { profilId: id },
      });
    },

    async deleteUser(id) {
      if (this.role.value == "admin" || this.role.value == "manager") {
        const url = `http://127.0.0.1:8000/api/users/${id}`;
        //Options de la requête API
        const options = {
          method: "DELETE",
          headers: {
            Authorization: " Bearer " + localStorage.getItem("@token"),
            Accept: "application/json",
          },
        };
        // va chercher les options de l'API
        const response = await fetch(url, options);
        // la récupération des data stockées dans l'API
        const data = await response.json();
        console.log(data);
      }
    },
    async editStatus(id) {
      const url = `http://127.0.0.1:8000/api/orders/${id}`;

      const options = {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: " Bearer " + localStorage.getItem("@token"),
          Accept: "application/json",
        },
        body: JSON.stringify({
          status: this.status,
        }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      this.$router.push({ name: "Dashboard" });
    },
  },
};
</script>

<style scoped>
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

.trHead {
  background-color: #f39c11;
  transition: all 0.2s ease-in;
  background-color: #fff;
  cursor: pointer;
}

th.array {
  /*padding: 12px;*/
  border-bottom: 1px solid #ddd;
}
td.array {
  /*padding: 12px;*/
  border-bottom: 1px solid #ddd;
}

.array .trHead {
  background-color: #f39c11;
  font-weight: bold;
  color: #fff;
}

tr:hover {
  background-color: #f5f5f5;
  transform: scale(1.02);
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);
}

i {
  width: 50px;
  cursor: pointer;
}

h2 {
  color: #f39c11;
}

.firm_details {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 100%;
}

.part_1 {
  display: flex;
  justify-content: space-evenly;
}

.news {
  display: flex;
  max-width: 80%;
  margin-left: 9%;
}
.news p {
  text-align: left;
  margin-left: 1%;
}
.news img {
  width: 150px;
  height: 120px;
  border-radius: 2px;
}

img {
  width: 150px;
  height: 150px;
}

.orders_div_head {
  display: flex;
  background-color: #f39c11;
  font-weight: bold;
  color: #fff;
}
.orders_div_body {
  display: flex;
}
.orders_th {
  min-width: 15%;
}

.orders_td {
  min-width: 15%;
}

.form_td {
  margin: auto;
  cursor: pointer;
}
</style>