<template>
  <NavbarreAdmin />
  <AllFirms />
</template>

<script>
import NavbarreAdmin from "../components/NavbarreAdmin.vue";
import AllFirms from "../components/AllFirms.vue";

export default {
  props: {
    firmId: String,
  },
  data() {
    return {
      token: localStorage.getItem("@token"),
    };
  },
  components: {
    NavbarreAdmin: NavbarreAdmin,
    AllFirms: AllFirms,
  },
};
</script>