<template>
  <h1>Ajouter un nouveau Type</h1>
  <div>
    <!--message suite au succés ou non de la requête -->
    <p v-if="this.status == 200">Votre Type à bien été crée</p>
    <p v-if="this.res == 500">Oups un problème est survenu</p>
  </div>
  <!--formulaire d'ajout d'un type de service -->
  <form @submit.prevent="addType">
    <label for="name">Type</label>
    <input type="text" v-model="name" id="name" />
    <input type="submit" value="Envoyer" id="submit_btn" />
    <br />
    <ul></ul>
    <h2>Listes des types de services</h2>
    <!--v-for pour afficher tout les types en BDD -->
    <div class="type_card" v-for="(element, index) in typesArray" :key="index">
      <p>
        {{ element.name }}
        <i @click="deleteType(element.id)" class="far fa-trash-alt"></i>
      </p>
    </div>
    <!-- v-for pour afficher des fake création de types pour rendre la page dynamique -->
    <p v-for="type in types" :key="type">
      {{ type }} <i class="far fa-trash-alt"></i>
    </p>
  </form>
</template>

<script>
export default {
  inject: ["role"],
  data() {
    return {
      name: "",
      status: "",
      res: "",
      types: [],
      typesArray: [],
      id: "",
    };
  },

  async mounted() {
    /*requete pour récuperer au montage tout les services en BDD*/
    const url = "http://127.0.0.1:8000/api/types";

    const options = {
      method: "GET",

      headers: {
        Authorization: "Bearer " + localStorage.getItem("@token"),
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    //console.log(data);
    this.typesArray = data.donnees;
    console.log(this.typesArray);
  },

  methods: {
    /* method pour ajouter un type de service en bdd avec vérification du token */
    async addType() {
      const url = "http://127.0.0.1:8000/api/types";

      const options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: this.name,
        }),
      };
      const response = await fetch(url, options);
      console.log(response);
      this.res = response.status;

      const data = await response.json();
      console.log(data);
      this.status = data.status_code;

      //ajout de fake data aprés validation input
      if (!this.name) {
        // input value is empty
        return;
      }
      // add item to reactive array items
      this.types.push(this.name);
      // clear the input
      this.name = "";
    },
    /* requete pour supprimer le type de service afficher en BDD et dynamiquement*/
    async deleteType(id) {
      const url = `http://127.0.0.1:8000/api/types/${id}`;

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
  margin-right: 165px;
}
#submit_btn {
  width: 200px;
  margin-top: 20px;
  color: #0f0f0f;
  background: #db9024;
  cursor: pointer;
  border: 2px solid #0f0f0f;
  transition: background 1s;
  height: 40px;
}
#submit_btn:hover {
  color: #db9024;
  background: #0f0f0f;
  border: 2px solid #db9024;
  transition: background 1s;
}
</style>