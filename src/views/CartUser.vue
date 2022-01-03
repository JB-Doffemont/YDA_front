<template>
  <Navbarre v-if="this.role.value !== 'admin'" />
  <NavbarreAdmin v-if="this.role.value == 'admin'" />

  <h1>Panier</h1>
  <h4 v-if="this.status == 200">Commande Validée</h4>
  <h4 v-if="this.status == 200">Maintenant vous avez le temps !</h4>
  <h4 class="italic" v-if="this.status == 200">...By Your Daily Assistant</h4>

  <button v-show="!show" @click="[sendCart(), (show = !show)]">
    Valider votre commande
  </button>
  <div class="cart_container">
    <Panier />
  </div>
</template>

<script>
import Panier from "../components/Orders/Panier.vue";
import NavbarreAdmin from "../components/NavbarreAdmin.vue";
import Navbarre from "../components/Navbarre.vue";
export default {
  inject: ["role"],
  components: {
    NavbarreAdmin: NavbarreAdmin,
    Navbarre: Navbarre,
    Panier: Panier,
  },
  data() {
    return {
      status: "",
      show: false,
    };
  },
  methods: {
    async sendCart() {
      const url = "http://127.0.0.1:8000/api/orders";
      const storage = JSON.parse(localStorage.getItem("@cart"));
      const options = {
        method: "POST",

        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          products: storage,
        }),
      };
      const response = await fetch(url, options);

      const data = await response.json();
      this.status = data.status_code;

      console.log(data);
      localStorage.removeItem("@cart");
    },
  },
};
</script>
<style scoped>
.cart_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.italic {
  font-style: italic;

  margin-left: 350px;
}
</style>