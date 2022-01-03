<template>
  <!--Component FOOTER réutilisable de partout-->
  <footer class="footer-distributed">
    <div class="footer-left">
      <img
        class="logo_footer"
        src="../assets/img/logo_without_title.png"
        alt="your_daily_assistant_logo"
      />
    </div>

    <div class="footer-center">
      <div>
        <p class="text">400, Avenue Roumanille. 06410 Biot</p>
      </div>
      <div class="contacts">
        <a class="footer-links" href="tel:+33643884382"> +33 6 43 88 43 82 </a>
      </div>
      <div class="contacts">
        <a
          class="footer-links"
          href="mailto:assistantes@your-daily-assistant.fr"
        >
          assistantes@your-daily-assistant.fr
        </a>
      </div>
    </div>

    <div class="footer-right">
      <div class="footer-icons">
        <a
          target="_blank"
          href="https://www.facebook.com/yda.yourdailyassistant/"
          ><i class="fab fa-facebook-square"></i
        ></a>
        <a
          target="_blank"
          href="https://www.instagram.com/yda.yourdailyassistant/"
          ><i class="fab fa-instagram"></i
        ></a>
        <a
          target="_blank"
          href="https://www.linkedin.com/company/yourdailyassistant/"
          ><i class="fab fa-linkedin-in"></i
        ></a>
        <a
          target="_blank"
          href="https://www.youtube.com/channel/UCcjWFm7MIB4Jop42q3ym-6g/"
          ><i class="fab fa-youtube"></i
        ></a>
      </div>
    </div>
  </footer>
</template>
 

<script>
export default {
  name: "Footer",
  props: {
    msg_footer: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer-distributed {
  background-color: #ffffff;
  border-top: 2px solid black;
  width: 100%;
  text-align: left;
  color: #080000;
  padding: 5px;
  margin-top: 2%;
  position: fixed;
  bottom: 0px;
}

.footer-distributed .footer-left,
.footer-distributed .footer-center,
.footer-distributed .footer-right {
  display: inline-block;
  vertical-align: top;
}

.footer-distributed .footer-left {
  width: 30%;
}
.footer-distributed .footer-right {
  margin-left: 20%;
}

.logo_footer {
  width: 15%;
  border-radius: 5px;
}

.footer-distributed .footer-links {
  color: #000000;

  text-decoration: none;
  padding: 0;
}

.footer-distributed .footer-center {
  width: 35%;
  text-align: center;
}

.footer-distributed .footer-center p {
  vertical-align: middle;
  margin: 0;
}

.footer-distributed .footer-icons a {
  display: inline-block;
  width: 35px;
  height: 35px;
  cursor: pointer;

  border-radius: 2px;
  margin-top: 20px;
  font-size: 20px;
  color: #020000;
  text-align: center;
  line-height: 35px;
  margin-right: 5px;
  margin-bottom: 5px;
}
@media (max-width: 880px) {
  .footer-distributed {
    display: none;
  }
}
</style>
<!--- 
@media (max-width: 880px) {
  .footer-distributed {
    font: bold 10px sans-serif;
  }

  .footer-distributed .footer-left,
  .footer-distributed .footer-center,
  .footer-distributed .footer-right {
    display: block;
    width: 100%;
    margin-bottom: 30px;
    text-align: center;
  }

  .footer-distributed .footer-center i {
    margin-left: 0;
  }
  .main {
    line-height: normal;
    font-size: auto;
  }
}-->
