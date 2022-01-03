<template>
  <div>
    <!--message suite au succés ou non de la requête -->
    <p v-if="this.status == 200">Votre produit à bien été ajouté</p>
    <p v-if="this.res == 500">Oups un problème est survenu</p>
  </div>
  <!--formulaire d'ajout d'un produit -->
  <form @submit.prevent="addProduct">
    <h1>Ajouter un nouveau produit</h1>
    <div class="top_form">
      <div class="child_top">
        <label for="name">Nom produit</label>
        <input type="text" name="name" id="name" v-model="name" />
      </div>

      <div class="child_top">
        <label for="price">Prix produit</label>
        <input type="number" name="price" id="price" v-model.number="price" />
      </div>
    </div>
    <div class="div_input_unique">
      <label for="image">Image</label>
      <input type="file" id="image" @change="uploadImage" name="image" />
      <div class="img_container">
        <img :src="previewImage" class="uploading-image" />
      </div>
    </div>
    <div class="text_container">
      <div class="div_input_unique">
        <label for="description">Description produit</label>
        <textarea
          type="text"
          class="block_area"
          name="description"
          id="description"
          v-model="description"
        ></textarea>
      </div>
    </div>

    <div class="bot_container">
      <div class="child_bot">
        <label for="checkbox">Produit actif</label>
        <input
          class="check"
          type="radio"
          id="checkbox"
          name="status"
          value="actif"
        />
        <label for="checkbox">Produit inactif</label>
        <input
          class="check"
          type="radio"
          id="checkbox"
          name="status"
          value="inactif"
        />
      </div>
    </div>
    <div class="div_input_unique">
      <label for="service">Categorie</label>
      <SelectServices />
    </div>

    <input id="submit_btn" type="submit" value="Valider" />
  </form>
</template>

<script>
/* import du component selectservices de tout les services enregistrés en BDD */
import SelectServices from "../UI/SelectServices.vue";

export default {
  inject: ["role"],
  data() {
    return {
      name: "",
      previewImage: null,
      description: "",
      price: "",
      service_id: "",
      checked: "",
      status: "",
      res: "",
      services: "",
    };
  },
  components: {
    SelectServices: SelectServices,
  },
  methods: {
    /* method pour télécharger l'image du formulaire*/
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
    /* method pour ajouter un produit en bdd avec vérification du token */
    async addProduct(e) {
      const url = "http://127.0.0.1:8000/api/products";

      const options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),
          Accept: "application/json",
        },
        body: new FormData(e.target),
      };
      const response = await fetch(url, options);
      console.log(response);
      this.res = response.status;
      const data = await response.json();
      console.log(data);
      this.status = data.status_code;
    },
  },
};
</script>

<style scoped>
.bot_container {
  margin: 15px auto;
  display: flex;
  gap: 20%;
  white-space: nowrap;
}

.child_bot {
  display: flex;
}
.div_input_unique {
  margin: auto;
  display: flex;
  flex-direction: column;
}

form {
  display: flex;
  flex-direction: column;
}
input {
  width: 200px;
  height: 30px;
  margin: 15px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
  transition: box-shadow 1.2s;
}
input:focus {
  box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
}
label {
  text-align: left;
  margin-top: 20px;
}
#submit_btn {
  margin-top: 20px;
  color: #0f0f0f;
  background: #db9024;
  cursor: pointer;
  border: 2px solid #0f0f0f;
  transition: background 1s;
  height: 40px;
  margin-left: auto;
}
#submit_btn:hover {
  color: #db9024;
  background: #0f0f0f;
  border: 2px solid #db9024;
  transition: background 1s;
}

.top_form {
  margin: auto;
  display: flex;
  gap: 20%;
}

.child_top {
  display: flex;
  flex-direction: column;
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

.check {
  box-shadow: none;
  border-radius: 100%;
  margin: 15px auto;
  width: 100px;
  text-align: left;
}

.check:focus {
  box-shadow: none;
}
.block_area {
  width: 26rem;
  height: 10rem;
  margin: 15px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 20%);
  outline: none;
  transition: box-shadow 1.2s;
}

.text_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.block_area:focus {
  box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
}
::-webkit-scrollbar {
  width: 14px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
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
.file {
  background: #db9024;
}
</style>