import { createRouter, createWebHistory } from "vue-router";
//import Home from "../views/Home.vue";
import Connexion from "../views/Connexion.vue";
import AddService from "../views/AddService.vue";
import DashBoard from "../views/DashBoardAdmin.vue";
import AddAccountByAdmin from "../views/AddAccountByAdmin.vue";
import CatalogueServices from "../views/Catalogue/CatalogueServices.vue";
import CatalogueProducts from "../views/Catalogue/CatalogueProducts.vue";
import Initialisation from "../views/InitialisationForm.vue";
import AllFirms from "../views/AllFirms.vue";
import UsersList from "../views/UsersListByFirm.vue";
import EditProfil from "../views/EditProfil.vue";
import CartUser from "../views/CartUser.vue";
import EditFirm from "../views/EditFirm.vue";
import DashMember from "../views/DashMember.vue";
import EditProfilMember from "../views/EditProfilMember.vue";

const routes = [
  {
    path: "/",
    name: "Connexion",
    component: Connexion,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  /*route de connexion*/
  {
    path: "/connexion",
    name: "Connexion",
    component: Connexion,
  },
  /*route pour ajouter de nouveaux types, services ou produits*/
  {
    path: "/addService",
    name: "AddService",
    component: AddService,
  },
  /*route pour acceder à la page d'acceuil*/
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashBoard,
  },
  /*route de création de compte admin, company ou membre*/
  {
    path: "/creation",
    name: "Creation",
    component: AddAccountByAdmin,
  },
  /*route d'affichage du catalogue des services'*/
  {
    path: "/catalogue/services",
    name: "CatalogueServices",
    component: CatalogueServices,
  },
  /*route d'affichage du catalogue des produits'*/
  {
    path: "/catalogue/products",
    name: "CatalogueProducts",
    component: CatalogueProducts,
    props: true,
  },
  /*route pour initialiser son MDP suite à oublie ou inscription*/
  {
    path: "/initialisation/:token",
    name: "initialisation",
    component: Initialisation,
    props: true,
  },
  {
    path: "/AllFirms",
    name: "AllFirms",
    component: AllFirms,
  },

  {
    path: "/Users",
    name: "Users",
    component: UsersList,
    props: true,
  },
  {
    path: "/Editprofil",
    name: "EditProfil",
    component: EditProfil,
    props: true,
  },
  {
    path: "/panier",
    name: "Panier",
    component: CartUser,
  },
  {
    path: "/EditFirm",
    name: "EditFirm",
    component: EditFirm,
    props: true,
  },
  {
    path: "/EditprofilMember",
    name: "EditProfilMember",
    component: EditProfilMember,
    props: true,
  },
  {
    path: "/DashMember",
    name: "DashMember",
    component: DashMember,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
