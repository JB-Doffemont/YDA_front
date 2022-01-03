<template>
  <div class="form_add_service">
    <div>
      <!--message suite au succés ou non de la requête -->
      <p v-if="this.status == 200">Votre Service à bien été crée</p>
      <p v-if="this.res == 500">Oups un problème est survenu</p>
    </div>
    <!--formulaire d'ajout d'un service -->
    <form @submit.prevent="addService">
      <div class="inside_form">
        <h1>Ajouter un nouveau service</h1>
        <div class="top_form">
          <div class="child_top">
            <label for="name">Nom</label>
            <input id="name" type="text" v-model="name" name="name" />
          </div>
          <div class="child_top">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" name="email" />
          </div>
        </div>
        <div class="mid_form">
          <div class="child_mid">
            <label for="phone">Téléphone</label>

            <input type="tel" id="phone" name="phone" v-model="phone" />
          </div>
          <div class="child_mid">
            <label for="categories">Categorie</label>
            <SelectType />
          </div>
        </div>
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
        <div class="bot_container">
          <div class="child_bot">
            <input
              type="radio"
              id="checkbox"
              class="check"
              name="status"
              value="actif"
            />
            <label for="checkbox">Produit actif</label>
          </div>

          <div class="child_bot">
            <input
              type="radio"
              id="checkbox"
              class="check"
              name="status"
              value="inactif"
            />
            <label for="checkbox">Produit inactif</label>
          </div>
        </div>
        <div class="text_container">
          <label for="description_1">Description</label>
          <textarea
            id="description_1"
            v-model="description_1"
            name="description_1"
            class="block_area"
          ></textarea>
        </div>

        <input
          id="submit_btn"
          type="submit"
          value="Ajouter un nouveau service"
        />
      </div>
    </form>
  </div>
</template>

<script>
/* import du component selectservices de tout les services enregistrés en BDD */
import SelectType from "../UI/SelectTypes.vue";
export default {
  inject: ["role"],
  data() {
    return {
      name: "",
      description_1: "",
      email: "",
      phone: "",
      type_id: "",
      previewImage: null,

      status: "",
      res: "",
    };
  },
  components: {
    SelectType: SelectType,
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
    /* method pour ajouter un service en bdd avec vérification du token */

    async addService(e) {
      const url = "http://127.0.0.1:8000/api/services";

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
select {
  width: 200px;
  height: 30px;
  margin: 15px 0;
  border: 1px solid transparent;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
select:focus {
  box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
}
.form_add_service {
  width: 100%;
}
form {
  margin: auto;
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
.inside_form {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  border-radius: 20%;
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
.mid_form {
  margin: auto;
  display: flex;
  gap: 20%;
}

.child_mid {
  display: flex;
  flex-direction: column;
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
.bot_container {
  margin: 15px auto;
  display: flex;
  gap: 20%;
  white-space: nowrap;
}

.child_bot {
  display: flex;
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