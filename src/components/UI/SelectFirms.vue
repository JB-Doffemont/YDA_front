<template>
  <!--v-for sur le select pour afficher tout les  services dispo en BDD -->
  <select name="firm_id" id="firm" v-model="select">
    <option
      v-for="(element, index) in firms"
      :key="index"
      :value="element.name"
    >
      {{ element.name }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      firms: "",
      select: "",
    };
  },
  async mounted() {
    /* requete pour récuperer les services en BDD */
    const url = "http://127.0.0.1:8000/api/firms";

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
    this.firms = data;
  },
};
</script>

<style scoped>

select {
  max-width: inherit;
}
</style>