<template>
  <!-- page d'ajout de types, services ou produits avec conditions d'affichage en fonction du formulaire choisi  -->
  <NavbarreAdmin />
  <div class="button">
    <button @click="showTypeForm()">Ajouter un type</button>
    <button @click="showServiceForm()">Ajouter un service</button>
    <button @click="showProductForm()">Ajouter un produit</button>
  </div>

  <div v-if="this.showType == true">
    <AddTypes></AddTypes>
  </div>
  <div v-if="this.showProduct == true">
    <AddProducts></AddProducts>
  </div>
  <div v-if="this.showService == true">
    <AddServices></AddServices>
  </div>
</template>
<script>
import NavbarreAdmin from "../components/NavbarreAdmin.vue";
import AddServices from "../components/AddToCatalogue/AddServices.vue";
import AddTypes from "../components/AddToCatalogue/AddTypes.vue";
import AddProducts from "../components/AddToCatalogue/AddProducts.vue";
export default {
  data() {
    return {
      showType: false,
      showProduct: false,
      showService: false,
    };
  },
  components: {
    NavbarreAdmin: NavbarreAdmin,
    AddServices: AddServices,
    AddTypes: AddTypes,
    AddProducts: AddProducts,
  },
  methods: {
    showTypeForm() {
      if (this.showType == false) {
        this.showType = true;
        this.showService = false;
        this.showProduct = false;
      }
    },
    showProductForm() {
      if (this.showProduct == false) {
        this.showProduct = true;
        this.showType = false;
        this.showService = false;
      }
    },
    showServiceForm() {
      if (this.showService == false) {
        this.showService = true;
        this.showType = false;
        this.showProduct = false;
      }
    },
  },
};
</script>
<style scoped>
.button {
  display: flex;
  justify-content: center;
}
button {
  border-radius: 5px;
  margin: 2%;
  background-color: #ffffff;
  color: #db9024;
}
</style>