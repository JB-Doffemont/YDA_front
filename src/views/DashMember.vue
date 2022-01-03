<template>
  <Navbarre />

  <div class="titre-profil"></div>
  <div class="dpt">
    <div class="part_one">
      <div class="date-form">
        <p class="date">
          Le
          {{ this.today }}
        </p>
      </div>
      <div class="card">
        <!-- Image à la une -->
        <div class="card-image">
          <a @click="editFirm">
            <img
              :src="`http://localhost:8000/img/avatar/` + this.avatar"
              alt="Orange"
            />
          </a>
        </div>
        <!-- Fin de l'image à la une -->

        <!-- Corp de notre carte -->
        <div class="card-body">
          <a href="/editProfilMember">
            <!-- Date de publication de l'article-->
            <div class="card-date">
              <time>Coordonnées</time>
            </div>

            <!-- Titre de l'article -->
            <div class="card-title">
              <h3>{{ this.firstname }} {{ this.lastname }}</h3>
            </div>
            <!-- Extrait de l'article -->
            <div class="card-excerpt">
              <p>
                Né(e) le : {{ moment(this.birthday).format("DD MMM YYYY ") }}
              </p>
              <p>Mail : {{ this.email }}</p>
              <p>Tel : {{ this.phone }}</p>
            </div>
          </a>
        </div>
        <!-- Fin du corp de notre carte -->
      </div>

      <div v-show="this.show" class="edit_firm">
        <p>
          <span class="id">{{ this.firmName }}</span>
        </p>
        <p class="id">{{ this.firmAddress }}</p>
        <p class="id">{{ this.firmPhone }}</p>
        <p class="id">{{ this.firmEmail }}</p>
      </div>
    </div>

    <div class="order_part">
      <div
        class="order_card"
        v-for="(element, index) in orderList"
        :key="index"
      >
        <div class="order_card_list">
          <p>
            Commande N°:
            <i
              ><strong>{{ element.id }}</strong></i
            ><span
              ><i
                ><strong>
                  du
                  {{ moment(element.created_at).format("DD MMM YYYY") }}</strong
                ></i
              ></span
            >
          </p>
          <p>
            Prix total :
            <i
              ><strong>{{ element.total }}€</strong></i
            >
          </p>
          <p>
            Status :
            <span :class="status_part"
              ><i
                ><strong>{{ element.status }}</strong></i
              ></span
            >
          </p>
        </div>
        <div class="odetail_part">
          <p>Détail Commande :</p>
          <div
            class="odetail_card"
            v-for="(odetail, i) in element.odetails"
            :key="i"
          >
            <p>
              <strong>{{ odetail.name }}</strong>

              Prix : {{ odetail.price_product }}€ Quantité :
              {{ odetail.qtty }} Total commande : {{ odetail.total_odetail }}€
              Commentaire : {{ odetail.comments }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <h3>VISITES ET LIVRAISONS LES LUNDI ET JEUDI à 11H00</h3>
  </div>
</template>
<script>
import Navbarre from "../components/Navbarre.vue";
import moment from "moment";

export default {
  name: "EditProfil",
  components: {
    Navbarre,
  },
  data() {
    return {
      lastname: "",
      firstname: "",
      email: "",
      id: "",
      phone: "",
      birthday: "",
      avatar: "",
      firm_id: "",
      firmName: "",
      firmAddress: "",
      firmPhone: "",
      firmEmail: "",
      orderList: [],

      today: new Date().toLocaleString(),

      show: false,
    };
  },

  created: function () {
    this.moment = moment;
  },

  async mounted() {
    const url =
      "http://127.0.0.1:8000/api/users/" + +localStorage.getItem("@id");

    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("@token"),
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    this.firstname = data.donnees[0].firstname;
    this.lastname = data.donnees[0].lastname;
    this.email = data.donnees[0].email;
    this.id = data.donnees[0].id;
    this.phone = data.donnees[0].phone;
    this.birthday = data.donnees[0].birthday;
    this.avatar = data.donnees[0].avatar;
    this.firm_id = data.donnees[0].firm_id;
    console.log(this.firm_id);
    this.orderList = data.donnees[0].orders;
    console.log(this.orderList);

    if (this.status == "en attente") {
      this.status = "status_part";
    } else if (this.status == "en cours") {
      this.status = "card";
    } else {
      this.status = "cardCold";
    }
  },

  methods: {
    async editFirm() {
      const url = "http://127.0.0.1:8000/api/firms/" + this.firm_id;

      const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),
          "content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      console.log(response);
      const data = await response.json();
      console.log(data);
      this.firmName = data.tab_firms[0].name;
      this.firmAddress = data.tab_firms[0].address;
      this.firmPhone = data.tab_firms[0].phone;
      this.firmEmail = data.tab_firms[0].email;
    },
  },
};
</script>
<style scoped>
.dpt {
  display: flex;
  flex-direction: row;
  margin: 10px;
  margin-left: 7%;
}
.part_one {
  margin: 10px;
}

.edit_firm {
  display: flex;
  flex-direction: column;
}

.order_part {
  height: 450px;
  padding: 5px;
  margin: 10px;
  margin-top: 60px;
  border-radius: 5px;

  background-color: rgba(139, 177, 189, 0.6);
  box-shadow: 0px 5px 20px #999;
  overflow: scroll;
  display: flex;
  flex-direction: column;
}

.order_card {
  margin: 5px;
  border-bottom: 1px black solid;
  display: flex;
  flex-direction: column;
}

.status_part {
  color: green;
  background-color: green;
}

.order_card_list {
  display: flex;
  flex-direction: row;
}
.order_card_list p {
  margin: 5px;
}

.odetail_part {
  overflow: scroll;
  height: 100%;
  background-color: rgba(139, 177, 189, 0.3);
}

.odetail_part p {
  font-size: 14px;
}
.odetail_card {
  padding-left: 12px;
  display: flex;
  flex-direction: row;
  border-bottom: 0.5px black solid;
  font-size: 12px;
}

.card {
  width: 400px; /*1*/
  margin: 0px auto; /*2*/
  background-color: white; /*3*/
  box-shadow: 0px 5px 20px #999; /*4*/
  border-radius: 5px;
}
.card a {
  /*5*/
  color: #333;
  text-decoration: none;
}
.card:hover .card-image img {
  /*6*/
  width: 70%;
  filter: grayscale(0);
}
.card-image {
  height: 250px; /*1*/
  position: relative; /*2*/
  overflow: hidden; /*3*/
}
.card-image img {
  width: 50%; /*4*/
  /*5 - Méthode de centrage en fonction de la taille de l'image */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: grayscale(1); /*6*/
  /*7 - Transition */
  transition-property: filter width;
  transition-duration: 0.3s;
  transition-timing-function: ease;
}
.card-body {
  text-align: center; /*1*/
  padding: 15px 20px; /*2*/
  box-sizing: border-box; /*3*/
}
.card-date {
  font-family: "Source Sans Pro", sans-serif;
}

.card-title,
.card-excerpt {
  font-family: "Playfair Display", serif;
}

.card-date,
.card-title {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}

.card-date,
.card-excerpt {
  color: #777;
}

.edit_firm {
  width: 100px;
  height: 50px;
}

::-webkit-scrollbar {
  width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 0px;
  box-shadow: inset 0px 0px 0px 0px rgb(0 0 0 / 20%);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #db9024;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0f0f0f;
}
</style>
