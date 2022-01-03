<template>
  <div>
    <!-- import de la barre de navigation -->
    <NavbarreAdmin />

    <div class="all">
      <!-- bouton pour affichage des formulaires -->
      <div class="button">
        <button
          @click="
            (this.showAccount = true),
              (this.showFirmAccount = false),
              (this.msg = false)
          "
          id="submit_btn"
        >
          Création Compte</button
        ><button
          @click="
            (this.showFirmAccount = true),
              (this.showAccount = false),
              (this.msg = false)
          "
          id="submit_btn"
          v-if="this.role.value == 'admin'"
        >
          Création d'entreprise
        </button>
      </div>
      <!-- formulaire création de nouveau compte -->
      <form
        v-show="this.showAccount"
        @submit.prevent="CreateAccountByAdmin"
        ref="test"
      >
        <!-- selection du compte à créer -->
        <div class="select">
          <p>Selectionez le type de compte que vous souhaitez créer :</p>
          <select
            @change="selectCategoryAccount($event)"
            name="role"
            id="add_account"
          >
            <option value="choix">Choix</option>
            <option v-if="this.role.value == 'admin'" value="admin">
              Admin
            </option>
            <option v-if="this.role.value == 'admin'" value="manager">
              Manager
            </option>
            <option value="member">Member</option>
          </select>
        </div>

        <div class="form">
          <div
            v-if="
              this.accountSelect == 'admin' ||
              this.accountSelect == 'manager' ||
              this.accountSelect == 'member'
            "
          >
            <div class="form_p1">
              <div class="form_p2">
                <label for="last_name">Nom : </label>
                <input type="text" id="last_name" name="lastname" />
              </div>

              <div class="form_p2">
                <label for="first_name">Prenom : </label>
                <input type="text" id="first_name" name="firstname" />
              </div>
            </div>
            <div class="form_p1">
              <div class="form_p2">
                <label for="email">E-mail : </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  v-model="inputEmail"
                />
              </div>

              <div class="form_p2">
                <label for="birthday">Date de naissance : </label>
                <input type="date" id="birthday" name="birthday" />
              </div>
            </div>
          </div>

          <!-- champs communs comptes manager et member-->
          <div
            v-if="
              this.accountSelect == 'manager' || this.accountSelect == 'member'
            "
          >
            <div class="form_p1">
              <div class="form_p2">
                <label for="add_phone">Téléphone : </label>
                <input type="tel" id="add_phone" name="phone" />
              </div>
              <div class="form_p2">
                <label for="add_firm">Entreprise : </label>
                <select
                  @change="selectFirm($event)"
                  @click="FirmChoice"
                  name="firm_id"
                  id="add_firm"
                >
                  <option
                    v-for="(firm, index) in firmList"
                    :key="index"
                    :value="firm.id"
                  >
                    {{ firm.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- champs spécifiques compte membre -->
          <div v-if="this.accountSelect == 'member'">
            <div class="form_p1">
              <div class="form_p2">
                <label for="avatar">Avatar :</label>
                <img :src="avatarPicture" class="preview" alt="" />
                <input
                  type="file"
                  @change="downloadAvatar"
                  name="avatar"
                  accept="/*"
                  enctype="multipart/form-data"
                />
              </div>
              <div class="form_p2">
                <label for="add_comment">Commentaire :</label>
                <textarea
                  type="text"
                  name="add_comment"
                  id="add_comment"
                  class="block_area"
                ></textarea>
              </div>
            </div>
          </div>

          <div v-if="accountSelect && this.accountSelect != 'choix'">
            <input id="submit_btn" type="submit" value="Valider" />
          </div>
        </div>
      </form>

      <!-- formulaire compte entreprise -->

      <div class="form" v-show="this.showFirmAccount">
        <form @submit.prevent="CreateAccountFirm">
          <div class="form_p1">
            <div class="form_p2">
              <label for="name">Nom : </label>
              <input type="text" id="name" name="name" />
            </div>

            <div class="form_p2">
              <label for="email">E-mail : </label>
              <input
                type="email"
                id="email"
                name="email"
                v-model="inputEmail"
              />
            </div>
          </div>

          <div class="form_p1">
            <div class="form_p2">
              <label for="address">Addresse :</label>
              <input type="text" name="address" id="address" />
            </div>

            <div class="form_p2">
              <label for="add_phone">Téléphone : </label>
              <input type="tel" id="add_phone" name="phone" />
            </div>
          </div>

          <div class="form_p1">
            <div class="form_p2">
              <label for="agenda">Premier passage :</label>

              <select name="visit_day_1">
                <option value="monday">Lundi</option>
                <option value="tuesday">Mardi</option>
                <option value="wednesday">Mercredi</option>
                <option value="thursday">Jeudi</option>
                <option value="friday">Vendredi</option>
              </select>
              <select name="time_1">
                <option value="8">8 - 10 H</option>
                <option value="10">10 - 12 H</option>
                <option value="12">12 - 14 H</option>
                <option value="14">14 - 16 H</option>
                <option value="16">16 - 18 H</option>
              </select>
            </div>

            <div class="form_p2">
              <label for="agenda">Deuxieme passage :</label>

              <select name="visit_day_2">
                <option value="monday">Lundi</option>
                <option value="tuesday">Mardi</option>
                <option value="wednesday">Mercredi</option>
                <option value="thursday">Jeudi</option>
                <option value="friday">Vendredi</option>
              </select>
              <select name="time_2">
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
              <input type="text" name="siret" id="add_siret" />
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
              <input type="text" name="title" />
            </div>
          </div>
          <div class="form_p2">
            <label for="news">Actualité : </label>
            <textarea type="text" name="news" class="block_area"></textarea>
          </div>

          <div>
            <input id="submit_btn" type="submit" value="Valider" />
          </div>
        </form>
      </div>
      <div v-show="this.msg == true" class="msg">Nouveau compte crée !</div>
    </div>
  </div>
</template>




<script>
import NavbarreAdmin from "../components/NavbarreAdmin.vue";

export default {
  inject: ["role"],
  name: "AddAccount",
  // component
  components: {
    NavbarreAdmin: NavbarreAdmin,
  },
  // data properties
  data() {
    return {
      inputEmail: "",
      accountSelect: "",
      firmSelect: "",
      logoPicture: "",
      avatarPicture: "",
      imageNews: "",
      showAccount: false,
      showFirmAccount: false,
      firmList: "",
      success: "",
      successFirm: "",
      msg: false,
    };
  },
  // methodes
  methods: {
    //Demande asynchronisée permettant la création du compte et l'envoi des données saisies au serveur API
    async CreateAccountByAdmin(e) {
      const url = "http://127.0.0.1:8000/api/inscription";
      //Options de la requête API
      const options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),
          Accept: "application/json",
        },
        body: new FormData(e.target),
      };
      // va chercher les options de l'API
      const response = await fetch(url, options);
      console.log(response);
      // la récupération des data stockées dans l'API
      const data = await response.json();
      console.log(data);

      const urlMagicLink = "http://127.0.0.1:8000/api/login";

      const optionsMagicLink = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },

        body: JSON.stringify({
          email: this.inputEmail,
        }),
      };

      const responseMagicLink = await fetch(urlMagicLink, optionsMagicLink);

      const dataMagicLink = await responseMagicLink.json();
      console.log(dataMagicLink);

      this.success = data.status_code;
      console.log(this.success);

      if (data.status_code == 200) {
        this.showAccount = false;
        this.msg = true;
      }
    },

    //Demande asynchronisée permettant la création du compte et l'envoi des données saisies au serveur API
    async CreateAccountFirm(e) {
      const url = "http://127.0.0.1:8000/api/firms";
      //Options de la requête API
      const options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
        body: new FormData(e.target),
      };
      // va chercher les options de l'API
      const response = await fetch(url, options);
      console.log(response);
      // la récupération des data stockées dans l'API
      const data = await response.json();
      console.log(data);

      this.successFirm = data.status_code;

      if (data.status_code == 200) {
        this.showFirmAccount = false;
        this.msg = true;
      }
    },

    async FirmChoice() {
      const url = "http://127.0.0.1:8000/api/firms";
      //Options de la requête API
      const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
      };
      // va chercher les options de l'API
      const response = await fetch(url, options);
      console.log(response);
      // la récupération des data stockées dans l'API
      const data = await response.json();
      console.log(data);

      this.firmList = data;
      console.log(this.firmList);
    },

    // Récupération de la valeur des selects
    selectCategoryAccount(event) {
      this.accountSelect = event.target.value;
    },

    selectFirm(event) {
      this.firmSelect = event.target.value;
      console.log(this.firmSelect);
    },

    // Chargement des images
    downloadLogo(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.logoPicture = e.target.result;
        console.log(this.logoPicture);
      };
    },

    downloadAvatar(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.avatarPicture = e.target.result;
        console.log(this.avatarPicture);
      };
    },

    downloadImageNews(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.imageNews = e.target.result;
        console.log(this.imageNews);
      };
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

.msg {
  margin-top: 10%;
}

textarea {
  resize: none;
}
</style>