<template>
  <Navbarre />
  <div>
    <div class="titre-profil">
      <h1 v-show="!this.show">Consultation de profil</h1>
      <h1 v-show="this.show">Modification de profil</h1>
    </div>
    <div>
      <div class="date-form"></div>
      <div class="content">
        <div class="prof" v-show="!this.show">
          <br />

          <p>
            Nom : <span class="id">{{ this.lastname }}</span>
          </p>
          <p>
            Prenom : <span class="id">{{ this.firstname }}</span>
          </p>
          <p>
            Mail : <span class="id">{{ this.email }}</span>
          </p>
          <p>
            Téléphone : <span class="id">{{ this.phone }}</span>
          </p>
          <p>
            Date de naissance :
            <span class="id">
              {{ moment(this.birthday).format("DD MMM YYYY ") }}</span
            >
          </p>

          <div class="profil-form">
            <button class="btn-grad" @click="this.show = true">
              Modifier mon profil
            </button>
          </div>
        </div>

        <div class="partie-profil">
          <br />
          <div class="modif-form" v-show="this.show">
            <p>Entrer vos modifications ici :</p>

            <input type="text" v-model="lastname" />
            <input type="text" v-model="firstname" />
            <input type="text" v-model="email" />
            <input type="text" v-model="phone" />
            <input
              type="date"
              placeholder="Date de naissance"
              v-model="birthday"
            />

            <br />

            <br />

            <button class="btn-grad" @click="putUser">Sauvegarder</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbarre from "../components/Navbarre.vue";
import moment from "moment";

export default {
  name: "EditProfil",
  components: {
    Navbarre,
  },
  data() {
    return {
      lastname: "",
      firstname: "",
      email: "",
      id: "",
      phone: "",
      birthday: "",
      today: new Date().toLocaleString(),
      avatar: "",

      show: false,
    };
  },
  created: function () {
    this.moment = moment;
  },

  async mounted() {
    const url =
      "http://127.0.0.1:8000/api/users/" +
      +localStorage.getItem("@id") +
      "/edit";

    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("@token"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    this.firstname = data.donnees[0].firstname;
    this.lastname = data.donnees[0].lastname;
    this.email = data.donnees[0].email;
    this.id = data.donnees[0].id;
    this.phone = data.donnees[0].phone;
    this.birthday = data.donnees[0].birthday;
  },
  methods: {
    async putUser() {
      const url =
        "http://127.0.0.1:8000/api/users/" + localStorage.getItem("@id");

      const options = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),

          "X-Requested-With": "XMLHttpRequest",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phone: this.phone,
          birthday: this.birthday,
        }),
      };
      console.log(this.newfirstname);
      const res = await fetch(url, options);
      console.log(res);
      const datauser = await res.json();
      console.log("voici le log de la res put user");
      console.log(datauser);
      alert("Votre profil a été mis à jour");
    },
  },
};
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  height: 400px;
  padding: 20px;
  margin-left: 300px;
  margin-right: 300px;
  background-color: rgba(0, 0, 0, 0.05);
}

.modif-form {
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  height: 20px;
  padding: 5px;
  margin: 5px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
  transition: box-shadow 1.2s;
  text-align: center;
  justify-content: center;
}
input :placeholder {
  font-size: 13px;
}
input:focus {
  box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  outline: none;
}

.btn-grad {
  background-image: linear-gradient(
    to right,
    #314755 0%,
    #26a0da 51%,
    #314755 100%
  );
}
.btn-grad {
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
.profil-form {
  padding-top: 80px;
}

.prof p {
  margin-top: 20px;
}
</style>