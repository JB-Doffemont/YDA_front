<template>
  <div
    v-if="radio !== 'inactif' || this.role.value !== 'member'"
    class="service_card"
  >
    <div class="image">
      <img :src="'http://localhost:8000/img/services/' + previewImage" />
    </div>
    <div class="title_description">
      <h2>{{ name }}</h2>
      <p class="p_container">{{ description_1 }}</p>
      <button @click="showServiceProducts(this.id)">Voir produits</button>
      <br />
      <div v-if="this.role.value == 'admin'" class="buttonedit">
        <i class="fas fa-pen" @click="showEdit = !showEdit"></i>

        <i @click="deleteService()" class="far fa-trash-alt"></i>
      </div>
    </div>

    <div v-show="showEdit">
      <form class="form" @submit.prevent="editService">
        <div>
          <label for="name">Nom</label>
        </div>
        <div>
          <input id="name" type="text" v-model="name" name="name" />
        </div>
        <div class="child_top">
          <div>
            <label for="email">Email</label>
          </div>
          <div>
            <input type="email" id="email" v-model="email" name="email" />
          </div>
        </div>
        <div class="mid_form">
          <div class="child_mid">
            <div>
              <label for="phone">Téléphone</label>
            </div>
            <div>
              <input type="tel" id="phone" name="phone" v-model="phone" />
            </div>
          </div>
          <div class="child_mid">
            <div>
              <label for="categories">Categorie</label>
            </div>

            <SelectType />
          </div>
        </div>
        <div class="img_parent">
          <div class="img_container">
            <div>
              <label for="image">Image</label>
            </div>
            <div>
              <input
                type="file"
                id="image"
                @change="uploadImage"
                name="image"
                class="file"
              />
            </div>
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

        <input id="submit_btn" type="submit" value="Enregistrer modification" />
      </form>
    </div>
  </div>
</template>

<script>
import SelectType from "../UI/SelectTypes.vue";

export default {
  inject: ["role"],
  components: {
    SelectType: SelectType,
  },

  props: {
    values: Object,
  },
  //watch sur les valeurs des services à afficher pour mettre à jour l'objet values et permettre le filtre par type de bien fonctionner
  watch: {
    values() {
      this.name = this.values.name ?? "";
      this.email = this.values.email ?? "";
      this.phone = this.values.phone ?? "";
      this.categories = this.values.categories ?? "";
      this.previewImage = this.values.image ?? null;
      this.description_1 = this.values.description_1 ?? "";
      this.showEdit = false;
      this.showModif = true;
      this.radio = this.values.status ?? "";
      this.id = this.values.id ?? "";
      this.type = this.values.type_id ?? "";
    },
  },

  data() {
    return {
      name: this.values.name ?? "",
      email: this.values.email ?? "",
      phone: this.values.phone ?? "",
      categories: this.values.categories ?? "",
      previewImage: this.values.image ?? null,
      description_1: this.values.description_1 ?? "",
      showEdit: false,
      showModif: true,
      radio: this.values.status ?? "",
      id: this.values.id ?? "",
      type: this.values.type_id ?? "",
    };
  },

  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },
    async editService() {
      const url = `http://127.0.0.1:8000/api/services/${this.id}`;

      const options = {
        method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("@token"),
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            phone: this.phone,
            image: this.image,
            description_1: this.description_1,
            status: this.radio,
            type_id: this.select,
          }),
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        
      
    },
    async showServiceProducts(id) {
      this.$router.push({
        name: "CatalogueProducts",
        params: { servicesId: id },
      });
    },
    async deleteService() {
      const url = `http://127.0.0.1:8000/api/services/${this.id}`;

      const options = {
        method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("@token"),
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        let i = this.servicesArray.map((item) => item.this.id).indexOf(this.id); // find index of your object
        this.servicesArray.splice(i, 1); // remove it from array
    
    },
      
      },
    
};
</script>

<style scoped>
button {
  margin: 2%;
  border-radius: 5px;
  background-color: #ffffff;
  color: black;
  cursor: pointer;
}
img {
  margin-top: 10px;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
}

.service_card {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: space-around;
  align-items: center;
  margin: 20px;

  border: 1px solid black;
  border-radius: 15px;
  box-shadow: 2px 6px transparent;
  transition: linear 0.6s;
}

.service_card:hover {
  box-shadow: 2px 6px #db9024;
  margin: 1px 20px 20px 20px;
}

.title_description {
  margin-left: 5%;
}
.buttonedit {
  display: flex;
  justify-content: center;
}
i {
  width: 40px;
  margin: 15px;
  cursor: pointer;
}
.p_container {
  overflow: scroll;
  height: 75px;
}
::-webkit-scrollbar {
  display: none;
}

.form {
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
  width: 20rem;
  height: 10rem;
  margin: 15px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 20%);
  outline: none;
  transition: box-shadow 1.2s;
  max-width: max-content;
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
</style>