<template>
  <div>
    <h2>AGENDA</h2>
    <table>
      <thead>
        <tr>
          <th>-</th>

          <th>LUNDI</th>

          <th>MARDI</th>

          <th>MERCREDI</th>

          <th>JEUDI</th>

          <th>VENDREDI</th>
        </tr>
      </thead>

      <!-- affichage de tous les utilisateurs -->

      <tbody>
        <td class="mardi">
          <tr>
            8 H
          </tr>
          <tr>
            10 H
          </tr>

          <tr>
            12 H
          </tr>

          <tr>
            14 H
          </tr>

          <tr>
            16 H
          </tr>
        </td>

        <td class="lundi">
          <div v-for="(firm, index) in arrayFirms" :key="index">
            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'lundi' && firm.time_1 == 8) ||
                  (firm.visit_day_2 == 'lundi' && firm.time_2 == 8)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'lundi' && firm.time_1 == 10) ||
                  (firm.visit_day_2 == 'lundi' && firm.time_2 == 10)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'lundi' && firm.time_1 == 12) ||
                  (firm.visit_day_2 == 'lundi' && firm.time_2 == 12)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'lundi' && firm.time_1 == 14) ||
                  (firm.visit_day_2 == 'lundi' && firm.time_2 == 14)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'lundi' && firm.time_1 == 16) ||
                  (firm.visit_day_2 == 'lundi' && firm.time_2 == 16)
                "
              >
                {{ firm.name }}
              </div>
            </tr>
          </div>
        </td>
        <!-- MARDI -->
        <td class="mardi">
          <div v-for="(firm, index) in arrayFirms" :key="index">
            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'mardi' && firm.time_1 == 8) ||
                  (firm.visit_day_2 == 'mardi' && firm.time_2 == 8)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'mardi' && firm.time_1 == 10) ||
                  (firm.visit_day_2 == 'mardi' && firm.time_2 == 10)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'mardi' && firm.time_1 == 12) ||
                  (firm.visit_day_2 == 'mardi' && firm.time_2 == 12)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'mardi' && firm.time_1 == 14) ||
                  (firm.visit_day_2 == 'mardi' && firm.time_2 == 14)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'mardi' && firm.time_1 == 16) ||
                  (firm.visit_day_2 == 'mardi' && firm.time_2 == 16)
                "
              >
                {{ firm.name }}
              </div>
            </tr>
          </div>
        </td>
        <!-- MERCREDI -->
        <td class="lundi">
          <div v-for="(firm, index) in arrayFirms" :key="index">
            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'mercredi' && firm.time_1 == 8) ||
                  (firm.visit_day_2 == 'mercredi' && firm.time_2 == 8)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'mercredi' && firm.time_1 == 10) ||
                  (firm.visit_day_2 == 'mercredi' && firm.time_2 == 10)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'mercredi' && firm.time_1 == 12) ||
                  (firm.visit_day_2 == 'mercredi' && firm.time_2 == 12)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'mercredi' && firm.time_1 == 14) ||
                  (firm.visit_day_2 == 'mercredi' && firm.time_2 == 14)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'mercredi' && firm.time_1 == 16) ||
                  (firm.visit_day_2 == 'mercredi' && firm.time_2 == 16)
                "
              >
                {{ firm.name }}
              </div>
            </tr>
          </div>
        </td>
        <!-- JEUDI -->
        <td class="mardi">
          <div v-for="(firm, index) in arrayFirms" :key="index">
            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'jeudi' && firm.time_1 == 8) ||
                  (firm.visit_day_2 == 'jeudi' && firm.time_2 == 8)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'jeudi' && firm.time_1 == 10) ||
                  (firm.visit_day_2 == 'jeudi' && firm.time_2 == 10)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'jeudi' && firm.time_1 == 12) ||
                  (firm.visit_day_2 == 'jeudi' && firm.time_2 == 12)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'jeudi' && firm.time_1 == 14) ||
                  (firm.visit_day_2 == 'jeudi' && firm.time_2 == 14)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'jeudi' && firm.time_1 == 16) ||
                  (firm.visit_day_2 == 'jeudi' && firm.time_2 == 16)
                "
              >
                {{ firm.name }}
              </div>
            </tr>
          </div>
        </td>

        <!-- VENDREDI -->
        <td class="lundi">
          <div v-for="(firm, index) in arrayFirms" :key="index">
            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'vendredi' && firm.time_1 == 8) ||
                  (firm.visit_day_2 == 'vendredi' && firm.time_2 == 8)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'vendredi' && firm.time_1 == 10) ||
                  (firm.visit_day_2 == 'vendredi' && firm.time_2 == 10)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'vendredi' && firm.time_1 == 12) ||
                  (firm.visit_day_2 == 'vendredi' && firm.time_2 == 12)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'vendredi' && firm.time_1 == 14) ||
                  (firm.visit_day_2 == 'vendredi' && firm.time_2 == 14)
                "
              >
                {{ firm.name }}
              </div>
            </tr>

            <tr>
              <div
                v-if="
                  (firm.visit_day_1 == 'vendredi' && firm.time_1 == 16) ||
                  (firm.visit_day_2 == 'vendredi' && firm.time_2 == 16)
                "
              >
                {{ firm.name }}
              </div>
            </tr>
          </div>
        </td>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  //props

  data() {
    return {
      arrayFirms: [],
      idUser: "",
    };
  },

  async mounted() {
    /*requete pour récuperer au montage tout les entreprises en BDD*/
    const url = `http://127.0.0.1:8000/api/firms`;
    //Options de la requête API
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("@token"),
        Accept: "application/json",
      },
    };
    // va chercher les options de l'API
    const response = await fetch(url, options);
    console.log(response);
    // la récupération des data stockées dans l'API
    const data = await response.json();
    console.log(data);

    this.arrayFirms = data;
  },

  methods: {},
};
</script>

<style scoped>
table td {
  width: 100%;
  height: 30px;
  border: black 1px solid;
}
table th {
  width: 150px;
  height: 50px;
  border: 1px solid rgb(240, 239, 239);
}
table thead {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  background-color: rgba(50, 88, 214, 0.733);
  font-size: 16px;
}

.lundi {
  background-color: rgb(189, 239, 243);
}
.mardi {
  background-color: rgb(187, 194, 194);
}
</style>