<template>
  <!--v-for sur le select pour afficher tout les  services dispo en BDD -->
  <select name="service_id" id="service" v-model="select">
    <option
      v-for="(element, index) in services"
      :key="index"
      :value="element.id"
    >
      {{ element.name }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      services: "",
      select: "",
    };
  },
  async mounted() {
    /* requete pour récuperer les services en BDD */
    const url = "http://127.0.0.1:8000/api/services";

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    console.log(response);

    const data = await response.json();
    console.log(data);
    this.services = data.donnees;
  },
};
</script>