 <template>
  <!--v-for sur le select pour afficher tout les types de services dispo en BDD -->

  <select name="type_id" id="categories" @change="handleChange">
    <option v-for="(element, index) in type" :key="index" :value="element.id">
      {{ element.name }}
    </option>
  </select>
</template>

<script>
export default {
  emits: [],
  data() {
    return {
      type: "",
    };
  },
  async mounted() {
    /* requete pour récuperer les types de services en BDD */

    const url = "http://127.0.0.1:8000/api/types";

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("@token"),
        Accept: "application/json",
      },
    };

    const response = await fetch(url, options);

    const data = await response.json();
    this.type = data.donnees;
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e);
    },
  },
};
</script>
 