<template>
  <div>
    <h2>Bonjour {{ this.firstname }}, maintenant vous avez le temps !</h2>
    <div class="form_initialisation">
      <!--FORM -->
      <div class="inside_form">
        <!--PASSWORD -->
        <label for="password">Créer un nouveau mot de passe :</label>
        <input
          id="password"
          type="password"
          name="password"
          v-model="inputPassword"
          required
        />
      </div>
    </div>

    <div class="form_initialisation">
      <form @submit.prevent="initialisation_mdp">
        <!--Confirmation PASSWORD -->
        <div class="inside_form">
          <label for="confirm">Confirmez votre mot de passe :</label>
          <input
            id="confirm"
            type="password"
            name="password"
            v-model="inputConfirm"
            required
          />

          <div v-if="this.success === false" class="p_red">
            <p>Les mots de passes doivent être identiques !</p>
          </div>
          <!-- CONNECTION BOUTON -->
          <input id="submit_btn" type="submit" value="Valider" />
        </div>
      </form>
    </div>
  </div>

  <Footer class="footer"></Footer>
</template>


<script>
import Footer from "../components/Footer.vue";

export default {
  props: {
    token: String,
  },

  data() {
    return {
      inputPassword: "",
      inputConfirm: "",
      success: "",
      arrayUsers: [],
      firstname: "",
      idUser: "",
    };
  },

  components: {
    Footer: Footer,
  },

  async mounted() {
    const url = `http://127.0.0.1:8000/api/verify-token/${this.token}`;
    //Options de la requête API
    const options = {
      method: "GET",
      headers: {
        Authorization: " Bearer " + localStorage.getItem(`@token`),
        "content-Type": "application/json",
        Accept: "application/json",
      },
    };
    // création de la const de réponse qui va chercher les options de l'API
    const response = await fetch(url, options);
    console.log(response);
    // Création de la const data qui nous permet la récupération des data stockées dans l'API
    const data = await response.json();
    console.log(data);

    const arrayUsers = data.user;
    console.log(arrayUsers);

    this.firstname = arrayUsers.firstname;
    this.idUser = arrayUsers.id;
  },

  methods: {
    //Demande asynchronisée permettant la récupération des identifiants utilisateur via l'API
    async initialisation_mdp() {
      if (this.inputPassword === this.inputConfirm) {
        const url = `http://127.0.0.1:8000/api/majMdp/${this.idUser}`;
        //Options de la requête API
        const options = {
          method: "PUT",
          headers: {
            Authorization: " bearer " + localStorage.getItem(`@token`),
            "X-Requested-With": "XMLHttpRequest",
            "content-Type": "application/json",
          },

          body: JSON.stringify({
            password: this.inputConfirm,
          }),
        };

        // création de la const de réponse qui va chercher les options de l'API
        const response = await fetch(url, options);
        console.log(response);
        // Création de la const data qui nous permet la récupération des data stockées dans l'API
        const data = await response.json();
        console.log(data);

        this.success = true;
        this.$router.push({ name: "Connexion" });
      } else {
        this.success = false;
      }
    },
  },
};
</script>
<style scoped>
.form_initialisation {
  width: 100%;
  height: 150px;
  margin-top: 40px auto;
}
form {
  margin: auto;
}
.p_red {
  color: red;
}

input {
  width: 50%;
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
  margin: auto;
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

.img_container img {
  width: 175px;
  margin: 30px;
}
.inside_form {
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: auto;
  border-radius: 20%;
}

.footer {
  position: absolute;
  bottom: 0px;
}
</style>