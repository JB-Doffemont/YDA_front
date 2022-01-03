<template>
  <NavbarreAdmin />
  <AllOrders />
  <Footer />
</template>

<script>
import NavbarreAdmin from "../components/NavbarreAdmin.vue";
import AllOrders from "../components/Orders/AllOrders.vue";
import Footer from "../components/Footer.vue";

export default {
  data() {
    return {
      token: localStorage.getItem("@token"),
    };
  },
  components: {
    NavbarreAdmin: NavbarreAdmin,
    AllOrders,
    Footer,
  },
};
</script>