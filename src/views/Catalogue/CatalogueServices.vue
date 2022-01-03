<template>
  <!--page d'afffichage du catalogue des services avec imports de différent composants-->

  <Navbarre v-if="this.role.value !== 'admin'" />
  <NavbarreAdmin v-if="this.role.value == 'admin'" />
  <AllServices />
</template>

<script>
import NavbarreAdmin from "../../components/NavbarreAdmin.vue";
import AllServices from "../../components/Catalogue/AllServices.vue";
import Navbarre from "../../components/Navbarre.vue";

export default {
  inject: ["role"],
  data() {
    return {
      globalCart: [],
    };
  },
  components: {
    NavbarreAdmin,
    AllServices,
    Navbarre,
  },
  methods: {},
};
</script>

