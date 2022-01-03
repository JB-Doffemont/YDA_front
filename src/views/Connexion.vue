<template>
  <div class="form_connexion">
    <!--FORM -->
    <form @submit.prevent="connectUser()">
      <div class="inside_form">
        <div class="img_container">
          <img src="../assets/img/logo_color.png" alt="" />
        </div>
        <!--EMAIL -->
        <div v-if="this.success == 500">
          <p class="p_red">E-mail ou mot de passe invalide</p>
        </div>
        <label for="username">Login</label>
        <input id="username" type="email" v-model="email" />
        <!--PASSWORD -->
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
        <router-link to="/connexion" @click="SendMagicLink"
          >Mot de passe oublié ?</router-link
        >
        <!-- CONNECTION BOUTON -->
        <input id="submit_btn" type="submit" value="Connexion" />
      </div>
    </form>
  </div>
  <div v-if="this.success == 200">
    <p>Vous venez de recevoir un mail pour valider votre compte !</p>
  </div>
  <div v-if="this.success == 500" class="p_red">
    <p>Veuillez renseigner votre e-mail de connexion !</p>
  </div>
  <Footer />
</template>
<script>
import Footer from "../components/Footer.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
      success: "",
      role: "",
    };
  },

  components: {
    Footer: Footer,
  },

  methods: {
    //Demande asynchronisée permettant la récupération des identifiants utilisateur via l'API
    async connectUser() {
      const url = "http://127.0.0.1:8000/api/connexion";
      //Options de la requête API
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      };
      // création de la const de réponse qui va chercher les options de l'API
      const response = await fetch(url, options);
      console.log(response);
      // Création de la const data qui nous permet la récupération des data stockées dans l'API
      const data = await response.json();
      console.log(data);
      this.success = data.status_code;
      this.role = data.role;

      // Sauvegarde du token généré par l'API lors de la connection

      //Si le status renvoyé par l'API est 200 alors on redirige vers la page utilisateur
      if (data.status_code == 200) {
        localStorage.setItem("@token", data.access_token);
        localStorage.setItem("@id", data.id);
        if (this.role == "admin") {
          this.$router.push({ name: "Dashboard" });
        } else {
          this.$router.push({ name: "DashMember" });
        }
      }
    },

    async SendMagicLink() {
      const urlMagicLink = "http://127.0.0.1:8000/api/login";

      const optionsMagicLink = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("@token"),
          Accept: "application/json",
        },

        body: JSON.stringify({
          email: this.email,
        }),
      };

      const responseMagicLink = await fetch(urlMagicLink, optionsMagicLink);

      const dataMagicLink = await responseMagicLink.json();
      console.log(dataMagicLink);

      this.success = dataMagicLink.status_code;
    },
  },
  watch: {
    role(value) {
      this.setRole(value);
    },
  },
  inject: ["setRole"],
};
</script>
<style scoped>
.form_connexion {
  width: 100%;
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
</style>