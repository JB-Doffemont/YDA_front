<template>
  <!--Component NavBarre réutilisable de partout-->
  <div>
    <div class="nav_primaire">
      <div class="logo">
        <img src="../assets/img/images.png" style="width: 200px" />
      </div>
      <router-link to="/connexion" @click="clearLocalStorage">
        <div class="fav_icon">
          <i class="fas fa-power-off"></i>
        </div>
      </router-link>
    </div>
    <div class="nav_secondaire">
      <nav>
        <ul>
          <li>
            <router-link class="anim" to="/DashMember"
              >Mes commandes</router-link
            >
          </li>

          <li>
            <router-link class="anim" to="/catalogue/services"
              >Catalogue</router-link
            >
          </li>

          <li>
            <router-link class="anim" to="/EditProfilMember"
              >Mon profil</router-link
            >
          </li>
          <li>
            <router-link class="anim" to="/panier">
              <i class="fas fa-shopping-cart"></i>
              <div v-if="notif != null" class="notif">1</div>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      notif: localStorage.getItem("@cart"),
    };
  },
  methods: {
    clearLocalStorage() {
      localStorage.removeItem("@token");
      localStorage.removeItem("@id");
    },
  },
};
</script>
<style scoped>
body {
  margin: 0px;
}
.nav_primaire {
  background-color: #ffffff;
  height: 99px;
  text-align: center;
  justify-content: center;
}

.nav_secondaire {
  background-color: #ffffff;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  height: 50px;
  text-align: center;
  justify-content: center;
  justify-items: center;
}

.logo img {
  position: absolute;
}
ul {
  display: flex;
  justify-content: center;
  margin: 0;
}
li {
  list-style: none;
  margin: 30px 15px;
}
.anim {
  content: "";
  text-decoration: none;
  color: #000000;
  margin: 3px 8px;
}

.anim::before {
  padding: 5px 0;
  margin: 0 8px;
  content: "";
  border-left: 2px solid transparent;
  color: #ffffff;
}
.anim::after {
  padding: 5px 0;
  margin: 0 8px;
  content: "";
  border-right: 2px solid transparent;
  color: #ffffff;
}
.anim:hover::before {
  margin: 0 8px;
  content: "";
  animation: btn1 0.5s;
  animation-fill-mode: forwards;
}
.anim:hover::after {
  margin: 0 8px;
  content: "";
  animation: btn1 0.5s;
  animation-fill-mode: forwards;
}
.fav_icon {
  color: rgb(7, 0, 0);
  text-align: right;
  position: absolute;
  right: 5%;
  top: 3%;
  font-size: 20px;
}
.notif {
  border: 1px;
  background: rgb(3, 101, 194);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: rgb(255, 255, 255);
  text-align: center;
  margin-left: 10px;
}
</style>