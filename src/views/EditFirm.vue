<template>
  <NavbarreAdmin />
  <h1>Edition de l'entreprise</h1>
  <span class="green">
    <p v-if="this.success == 200">Edition de l'entreprise réussite</p>
  </span>
  <span class="red">
    <p v-if="this.error == 422">Oups une erreur s'est produite</p>
  </span>

  <div class="form" v-show="this.show">
    <form @submit.prevent="editFirm">
      <div class="form_p1">
        <div class="form_p2">
          <label for="name">Nom : </label>
          <input type="text" id="name" name="name" v-model="name" />
        </div>

        <div class="form_p2">
          <label for="email">E-mail : </label>
          <input type="email" id="email" name="email" v-model="email" />
        </div>
      </div>

      <div class="form_p1">
        <div class="form_p2">
          <label for="address">Addresse :</label>
          <input type="text" name="address" id="address" v-model="address" />
        </div>

        <div class="form_p2">
          <label for="add_phone">Téléphone : </label>
          <input type="tel" id="add_phone" name="phone" v-model="phone" />
        </div>
      </div>

      <div class="form_p1">
        <div class="form_p2">
          <label for="agenda">Premier passage :</label>

          <select name="visit_day_1" @change="selectDay1($event)">
            <option value="">Choix Jour</option>
            <option value="monday">Lundi</option>
            <option value="tuesday">Mardi</option>
            <option value="wednesday">Mercredi</option>
            <option value="thursday">Jeudi</option>
            <option value="friday">Vendredi</option>
          </select>
          <select name="time_1" @change="selectHour1($event)">
            <option value="">Choix Heure</option>
            <option value="8">8 - 10 H</option>
            <option value="10">10 - 12 H</option>
            <option value="12">12 - 14 H</option>
            <option value="14">14 - 16 H</option>
            <option value="16">16 - 18 H</option>
          </select>
        </div>

        <div class="form_p2">
          <label for="agenda">Deuxieme passage :</label>

          <select name="visit_day_2" @change="selectDay2($event)">
            <option value="">Choix Jour</option>
            <option value="monday">Lundi</option>
            <option value="tuesday">Mardi</option>
            <option value="wednesday">Mercredi</option>
            <option value="thursday">Jeudi</option>
            <option value="friday">Vendredi</option>
          </select>
          <select name="time_2" @change="selectHour2($event)">
            <option value="">Choix Heure</option>
            <option value="8">8 - 10 H</option>
            <option value="10">10 - 12 H</option>
            <option value="12">12 - 14 H</option>
            <option value="14">14 - 16 H</option>
            <option value="16">16 - 18 H</option>
          </select>
        </div>
      </div>

      <div class="form_p1">
        <div class="form_p2">
          <label for="add_siret">Siret :</label>
          <input type="text" name="siret" id="add_siret" v-model="siret" />
        </div>
      </div>

      <div class="form_p1">
        <div class="form_p2">
          <label for="logo">Logo :</label>
          <img :src="logoPicture" class="preview" alt="" />
          <input
            type="file"
            @change="downloadLogo"
            name="logo"
            id="logo"
            accept="/*"
            enctype="multipart/form-data"
          />
        </div>
        <div class="form_p2">
          <label for="add_color">Couleur de l'entreprise : </label>
          <select name="color" id="add_color">
            <option value="color">bleu</option>
          </select>
        </div>
      </div>

      <div class="form_p1">
        <div class="form_p2">
          <label for="logo">Image actualité :</label>
          <img :src="imageNews" class="preview" alt="" />
          <input
            type="file"
            @change="downloadImageNews"
            name="image"
            id="image"
            accept="/*"
            enctype="multipart/form-data"
          />
        </div>
        <div class="form_p2">
          <label for="title">Titre de l'actualité : </label>
          <input type="text" name="title" v-model="title" />
        </div>
        <div class="form_p2">
          <label for="news">Actualité : </label>
          <input type="text" name="news" v-model="news" />
        </div>
      </div>

      <div>
        <input
          id="submit_btn"
          type="submit"
          @click="this.show = false"
          value="Valider"
        />
      </div>
    </form>
  </div>
</template>

<script>
import NavbarreAdmin from "../components/NavbarreAdmin.vue";

export default {
  inject: ["role"],
  components: {
    NavbarreAdmin: NavbarreAdmin,
  },
  props: {
    firmId: String,
  },
  data() {
    return {
      id: this.firmId,
      name: "",
      address: "",
      phone: "",
      color: "",
      siret: "",
      subscription: "",
      visit_day_time_1: "",
      visit_day_time_2: "",
      email: "",
      success: "",
      error: "",
      title: "",
      news: "",
      day1_select: "",
      day2_select: "",
      hour1_select: "",
      hour2_select: "",
      show: true,
    };
  },
  methods: {
    selectDay1(event) {
      this.day1_select = event.target.value;
      console.log(this.day1_select);
    },
    selectDay2(event) {
      this.day2_select = event.target.value;
      console.log(this.day2_select);
    },
    selectHour1(event) {
      this.hour1_select = event.target.value;
      console.log(this.hour1_select);
    },
    selectHour2(event) {
      this.hour2_select = event.target.value;
      console.log(this.hour2_select);
    },

    async editFirm() {
      if (this.role.value == "admin") {
        const url = `http://127.0.0.1:8000/api/firms/${this.id}`;

        const options = {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("@token"),
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            address: this.address,
            email: this.email,
            phone: this.phone,
            siret: this.siret,
            subscription: this.subscription,
            visit_day_1: this.day1_select,
            visit_day_2: this.day2_select,
            time_1: this.hour1_select,
            time_2: this.hour2_select,
            title: this.title,
            news: this.news,
          }),
        };

        const res = await fetch(url, options);
        this.error = res.status;
        console.log(res);
        const data = await res.json();
        console.log(data);
        this.success = data.status_code;
      }
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 600px;
  margin: auto;
  text-align: initial;
}

.form input {
  width: 100%;
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

#submit_btn {
  width: 25%;
  margin-top: 20px;
  color: #0f0f0f;
  background: #db9024;
  cursor: pointer;

  transition: background 1s;
  height: 40px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
#submit_btn:hover {
  color: #0f0f0f;
  transition: box-shadow 1s;
  box-shadow: inset 3px 3px 3px 2px rgba(0, 0, 0, 0.2);
}

.btn {
  margin: auto;
}

.select {
  margin: auto;
}

.form_p1 {
  display: flex;
  align-items: center;
  gap: 50px;
}

.form_p2 {
  display: flex;
  flex-direction: column;
  align-items: initial;
  width: 40%;
  margin: auto;
  border-radius: 20%;
}

.preview {
  width: 150px;
  height: 150px;
}
.green {
  color: green;
}
.red {
  color: red;
}
</style>