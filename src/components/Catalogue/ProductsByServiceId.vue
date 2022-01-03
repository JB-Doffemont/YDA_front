<template>
  <div>
    <h1>Produits</h1>
    <div v-for="(element, index) in productsArray" :key="index">
      <Product
        v-for="(value, index) in element.products"
        :key="index"
        :values="value"
        :addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import Product from "./Product.vue";

export default {
  components: {
    Product,
  },
  props: {
    servicesId: String,
    addToGlobal: Function,
  },
  data() {
    return {
      productsArray: [],
      name: "",
      cart: [],
    };
  },
  async mounted() {
    const url = `http://127.0.0.1:8000/api/services/${this.servicesId}`;

    const options = {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    this.productsArray = data.donnees;

    let cart = JSON.parse(localStorage.getItem("@cart"));
    if (Array.isArray(cart)) {
      console.log("TEST---------------");
      this.cart = cart;
    }
  },

  methods: {
    addToCart(product) {
      this.cart = [...this.cart, product];
      localStorage.setItem("@cart", JSON.stringify(this.cart));
    },
  },
};
</script>

<style scoped>
img {
  width: 15rem;
  height: 15rem;
}

.product_card {
  display: flex;
  justify-content: space-between;
  align-content: space-around;
  align-items: center;
  margin: 5%;
  padding: 1%;
  border: 1px solid #000;
  border-radius: 20px;
  box-shadow: 2px 1px 9px 0px black;
}

.product_card:hover {
  box-shadow: inset 2px 1px 9px 0px black;
}

.image {
  margin-left: 1%;
}

.img_parent {
  margin: auto;
  display: flex;
  gap: 20%;
}
.img_container {
  display: flex;
  flex-direction: column;
}
.img_container img {
  width: 200px;
  height: auto;
  margin: 0px;
}

.title_description {
  margin-left: 5%;
}
.edit_product {
  display: flex;
  flex-direction: column;
  margin-left: 24%;
}
</style>