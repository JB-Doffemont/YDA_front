<template>
  <h2>Listes des commandes</h2>
  <br />
  <table>
    <thead>
      <tr>
        <div>
          <td>Commande n°</td>
          <td>
            <select
              name="status"
              id="status"
              @change="selectedStatus = $event.target.value"
            >
              <option value="">Statuts</option>
              <option value="en cours">En cours</option>
              <option value="en attente">En attente</option>
              <option value="terminée">Terminées</option>
            </select>
          </td>
          <td>Prix total</td>
          <td>Date création</td>
          <td>Date dernière modification</td>
          <td>Entreprises:<SelectFirms @change="getFirmValue($event)" /></td>
          <td>Nom salarié</td>
        </div>
      </tr>
    </thead>

    <!--v-for pour afficher tout les commandes en BDD -->
    <div class="tbody">
      <tbody class="v-for" v-for="(element, index) in filterFirms" :key="index">
        <tr v-for="(user, index) in element.users" :key="index">
          <div v-for="(order, index) in user.orders" :key="index">
            <td>{{ order.id }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.total }}€</td>
            <td>
              {{ moment(order.created_at).format("DD MMM YYYY, HH:mm ") }}
            </td>
            <td>
              {{ moment(order.updated_at).format("DD MMM YYYY, HH:mm ") }}
            </td>
            <td class="selectfirm" @click="getOrdersByFirm(element.id)">
              {{ element.name }}
            </td>
            <td>{{ user.firstname }} {{ user.lastname }}</td>
            <br />
          </div>
        </tr>
      </tbody>
    </div>
  </table>
</template>
<script>
import SelectFirms from "../UI/SelectFirms.vue";

import moment from "moment";
export default {
  data() {
    return {
      ordersList: [],
      id: "",
      status: "",
      getValueFromOptions: "",
      idFirm: "",
      selectedStatus: "",
    };
  },
  components: {
    SelectFirms,
  },

  created: function () {
    this.moment = moment;
  },

  async mounted() {
    /*requete pour récuperer au montage tout les entreprises, et les users avec leurs commandes en BDD*/
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
    // la récupération des data stockées dans l'API
    const data = await response.json();
    this.ordersList = data;
    console.log(this.ordersList);

    ////

    /*requete pour récuperer au montage tout les entreprises, et les users avec leurs commandes en BDD*/
    const urls = "http://127.0.0.1:8000/api/orders";
    //Options de la requête API
    const option = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
    };
    // va chercher les options de l'API
    const retour = await fetch(urls, option);
    // la récupération des data stockées dans l'API
    const datas = await retour.json();
    this.orderstatus = datas.donnees;
  },

  methods: {
    /*récupération de l'event change sur le select pour la fonction de filtre ci dessous*/
    getFirmValue(event) {
      this.getValueFromOptions = event.target.value;
      console.log(this.getValueFromOptions);
    },
    async getOrdersByFirm(id) {
      this.$router.push({
        name: "Users",
        params: { firmId: id },
      });
    },
  },

  computed: {
    /* fonction de filtre par status*/

    filterFirms() {
      let filteredFirms = this.ordersList.filter((element) => {
        if (this.getValueFromOptions != "") {
          return String(this.getValueFromOptions) == String(element.name);
        } else {
          return true;
        }
      });

      if (this.selectedStatus !== "") {
        filteredFirms = filteredFirms.map((firm) => {
          let firmCopy = JSON.parse(JSON.stringify(firm));
          firmCopy.users = firmCopy.users.map((user) => {
            user.orders = user.orders.filter((order) => {
              return order.status === this.selectedStatus;
            });
            return user;
          });
          return firmCopy;
        });
      }

      return filteredFirms;
    },
  },
};
</script>

<style scoped>
.selectfirm:hover {
  cursor: pointer;
  border: #ffa500 solid 1px;
}
.order_card {
  display: flex;
  flex-direction: column;
  margin: 2%;
  border-radius: 5px;
  border: 2px solid black;
  padding: 1%;
}

.groupeOrders {
  display: flex;
}
td {
  padding: 5px;
  border: #000 solid 2px;
  min-width: 10rem;
  max-width: 10rem;
}
table {
  font-size: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}
thead {
  border: solid 3px #ffa500;
}
.tbody {
  border-left: solid 3px #ffa500;
  border-bottom: solid 3px #ffa500;
  border-right: solid 3px #ffa500;
}
</style>