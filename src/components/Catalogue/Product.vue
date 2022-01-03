<template>
  <div
    v-if="radio !== 'inactif' || this.role.value !== 'member'"
    class="product_card"
  >
    <div class="image">
      <img :src="'http://localhost:8000/img/services/' + previewImage" />
    </div>
    <div class="title_description">
      <h2>{{ name }}</h2>
      <p>{{ description }}</p>
      {{ price }}€
      <div v-if="this.role.value == 'admin'" class="buttonedit">
        <i class="fas fa-pen" @click="showEdit = !showEdit"></i>
        <i
          v-if="this.role.value == 'admin'"
          @click="deleteProduct()"
          class="far fa-trash-alt"
        ></i>
      </div>
    </div>

    <div class="orders">
      <form class="command_form" @submit.prevent="addProductToCart">
        <label for="comment">Ajoutez un commentaire à votre commande</label>
        <input id="comment" type="text" v-model="comment" />
        <label for="qt">Quantité</label>
        <input id="qt" type="number" v-model="quantity" />
        <label for="toto"></label>
        <input
          id="toto"
          class="addToCart"
          type="submit"
          value="Ajouter au panier"
          @click="status = !status"
        />
      </form>
      <p v-show="status">Produit ajouté au panier</p>
    </div>

    <div class="edit_container" v-show="showEdit">
      <form class="edit_product" @submit.prevent="editProduct">
        <label>Nom</label>
        <input type="text" v-model="name" name="name" id="name" />

        <div class="img_parent">
          <div class="img_container">
            <label for="image">Image</label>
            <input
              type="file"
              id="image"
              @change="uploadImage"
              name="image"
              class="file"
            />
          </div>

          <div class="img_container">
            <img :src="previewImage" class="uploading-image" />
          </div>
        </div>

        <label for="description">Description produit</label>
        <input
          type="text"
          name="description"
          id="description"
          v-model="description"
        />

        <label for="price">Prix produit</label>
        <input type="number" name="price" id="price" v-model.number="price" />
        <div class="div_actif">
          <input
            type="radio"
            id="checkbox"
            name="status"
            v-model="radio"
            value="actif"
          />
          <label for="checkbox">Produit actif</label>
        </div>
        <div class="div_actif">
          <input
            type="radio"
            id="checkbox"
            name="status"
            v-model="radio"
            value="inactif"
          />

          <label for="checkbox">Produit inactif</label>
        </div>

        <SelectServices />
        <input type="submit" value="valider" id="valider" />
      </form>
    </div>
  </div>
</template>

<script>
import SelectServices from "../UI/SelectServices.vue";

export default {
  inject: ["role"],
  components: {
    SelectServices: SelectServices,
  },

  props: {
    values: Object,
    addToCart: Function,
  },

  data() {
    return {
      name: this.values.name ?? "",
      previewImage: this.values.image ?? null,
      description: this.values.description ?? "",
      price: this.values.price ?? "",
      showEdit: false,
      showModif: true,
      radio: this.values.status ?? "",
      id: this.values.id,
      quantity: "",
      comment: "",
      globalCart: [],
      status: false,
    };
  },

  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
    async editProduct() {
      const url = `http://127.0.0.1:8000/api/products/${this.id}`;

      const options = {
        method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("@token"),
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            image: this.image,
            description: this.description,
            price: this.price,
            status: this.radio,
            service_id: this.select,
          }),
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
      
    },
    addProductToCart() {
      this.addToCart({
        comment: this.comment,
        quantity: this.quantity,
        id: this.id,
        name: this.name,
        price: this.price,
      });
    },

    async deleteProduct() {
      
        const url = `http://127.0.0.1:8000/api/products/${this.id}`;

        const options = {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("@token"),
            Accept: "application/json",
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
      
    },
  }
  
};
</script>

<style scoped>
.edit_product {
  display: flex;
  flex-direction: column;
}
img {
  width: 200px;
  border-radius: 50%;
  height: 200px;
}
.command_form {
  display: flex;
  flex-direction: column;
}
.command_form label {
  text-align: left;
  margin: 10px 0;
}
.command_form input {
  height: 30px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
  transition: box-shadow 1.2s;
}
.command_form input:focus {
  box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
}

.addToCart {
  margin-top: 20px;
  color: #0f0f0f;
  background: #ffffff;
  cursor: pointer;
  border: 3px solid #0f0f0f;
  height: 20px;
  margin-left: auto;
  font-size: 1.3rem;
}

.addToCart:hover {
  color: #0f0f0f;
  background: #49be25;
  transition: background 1s;
}

.buttonedit {
  display: flex;
  justify-content: center;
}
i {
  margin: 20px 10px;
}
.edit_product input {
  height: 30px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
  transition: box-shadow 1.2s;
}

.edit_product label {
  text-align: left;
  margin: 10px 0;
}

.img_container {
  display: flex;
  flex-direction: column;
}

.img_container img {
  width: 60px;
  height: 60px;
}
.div_actif {
  display: flex;
  gap: 40px;
  padding-left: 20px;
}
.div_actif input {
  box-shadow: none;
  width: 20px;
}
select {
  height: 30px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
  transition: box-shadow 1.2s;
}
select:focus {
  box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
}
#valider:focus {
  box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
}
</style>