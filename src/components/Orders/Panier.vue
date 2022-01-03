<template>
  <div v-for="(element, index) in this.cart" :key="index">
    <div class="cart">
      <p>Commentaire:</p>
      <p>{{ element.comment }}</p>
      <p>Prix: {{ element.price }}€</p>
      <p>quantité: {{ element.quantity }}</p>
      <p>Produit: {{ element.name }}</p>
      <button>Supprimer du panier</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("@cart")),
      product: [],
      toto: "",
      getValueFromOptions: "",
    };
  },
  async mounted() {
    const url = "http://127.0.0.1:8000/api/products/";

    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("@token"),
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    this.product = data.donnees;
  },

  methods: {},
};
</script>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  margin: 10px 25px;
  border: 1px solid #0f0f0f;
  border-radius: 4px;
  padding: 8px;
  width: 300px;
  height: 300px;
}
button:focus {
  box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
}
button {
  height: 30px;
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
  transition: box-shadow 1.2s;
  width: 150px;
}
</style>