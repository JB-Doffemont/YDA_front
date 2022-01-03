<template>
  <NavbarreAdmin />
  <div class="profil">
    <h1>Profil de {{ this.firstname }}</h1>
    <div class="profil">
      <div class="avatar">
        <img :src="`http://localhost:8000/img/avatar/` + this.avatar" />
      </div>
      <div class="name">
        <div>
          <p>
            {{ this.lastname }}
          </p>
        </div>
        <div>
          <p>
            {{ this.firstname }}
          </p>
        </div>
      </div>

      <div class="contact">
        <div>
          <p>Mail : {{ this.email }}</p>
        </div>
        <div>
          <p>Téléphone : {{ this.phone }}</p>
        </div>
      </div>
      <p>Date de naissance : {{ this.birthday }}</p>

      <div class="button">
        <button id="submit_btn" @click="this.show = true">
          Modifier mon profil
        </button>
      </div>
    </div>
  </div>

  <div class="edit">
    <div v-show="this.show">
      <p>Entrer vos modifications ici :</p>
      <form class="form" @submit.prevent="editUser">
        <div class="form_p1">
          <div class="form_p2">
            <label for="name">Nom :</label>
            <input type="text" id="name" v-model="lastname" />
          </div>
          <div class="form_p2">
            <label for="firstname">Prenom :</label>
            <input type="text" id="firstname" v-model="firstname" />
          </div>
        </div>

        <div class="form_p1">
          <div class="form_p2">
            <label for="email">E-mail :</label>
            <input type="email" id="email" v-model="email" />
          </div>
          <div class="form_p2">
            <label for="phone">Téléphone</label>
            <input type="tel" id="phone" v-model="phone" />
          </div>
        </div>

        <div class="form_p1">
          <div class="form_p2">
            <label for="birthday">Date de naissance :</label>
            <input
              type="date"
              id="birthday"
              placeholder="Date de naissance"
              v-model="birthday"
            />
          </div>
        </div>

        <input type="submit" id="submit_btn" />
      </form>
    </div>

    <div v-if="this.success == true">
      <p>Profil modifié avec succès !</p>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import Footer from "../components/Footer.vue";
import NavbarreAdmin from "../components/NavbarreAdmin.vue";

export default {
  name: "EditProfil",
  components: {
    Footer: Footer,
    NavbarreAdmin,
  },

  props: {
    profilId: String,
  },

  data() {
    return {
      arrayProfil: [],
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      birthday: "",
      avatar: "",
      today: new Date().toLocaleString(),
      success: false,
      show: false,
      id: parseInt(this.profilId),
    };
  },

  async mounted() {
    const url = `http://127.0.0.1:8000/api/users/${this.id}`;

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

    var foo = this.id;
    console.log(typeof foo);

    const arrayProfil = data.donnees;
    console.log(arrayProfil);
    this.firstname = arrayProfil[0].firstname;
    this.lastname = arrayProfil[0].lastname;
    this.email = arrayProfil[0].email;
    this.phone = arrayProfil[0].phone;
    this.birthday = arrayProfil[0].birthday;
    this.avatar = arrayProfil[0].avatar;
  },
  methods: {
    async editUser() {
      const url = `http://127.0.0.1:8000/api/users/${this.id}`;

      const options = {
        method: "PUT",
        headers: {
          Authorization: "bearer " + localStorage.getItem("@token"),
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

      const res = await fetch(url, options);
      console.log(res);
      const dataUser = await res.json();
      console.log(dataUser);

      if (dataUser.status_code == 200) {
        this.success = true;
        this.show = false;
      }
    },
  },
};
</script>

<style scoped>
.profil {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  border-radius: 200px;
  height: 150px;
  width: 150px;
}

.name {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.contact {
  display: flex;
  margin: auto;
  gap: 50px;
}

.edit {
  border-top: 7px ridge #f39c11;
  margin-top: 10%;
}

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

.button {
  width: 100%;
}

#submit_btn {
  width: 100%;
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
</style>