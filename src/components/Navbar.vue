<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-dark bg-dark">
      <a v-if="!user " class="navbar-brand">Welcome Visitor</a>
      <a v-if="user " class="navbar-brand">Welcome {{user.firstName}}</a>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href @click="goBack">
            Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="goToBikes" href>Rent a Bike</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="goToMyRentals" href>My Rentals</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="goToRentals" href>Cart</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" @click="goToTerms" href>Terms and Conditions</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a v-if="!user" class="nav-link" @click="signUp">Sign Up</a>
        </li>
        <li>
          <a v-if="!user" class="nav-link" @click="logIn">Log In</a>
          <!-- v-if="user" -->
          <a class="nav-link" @click="logOut">Log Out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      if (this.$router.currentRoute.name != "Home") {
        this.$router.push("/");
      }
    },
    logOut() {
      this.$store.dispatch("logout");
    },
    signUp() {
      if (this.$router.currentRoute.name != "Home") {
        this.$router.push("/");
      }
      this.$store.commit("setLoginForm", false);
      this.$store.commit("setRegisterForm", true);
    },
    logIn() {
      if (this.$router.currentRoute.name != "Home") {
        this.$router.push("/");
      }

      this.$store.commit("setLoginForm", true);
      this.$store.commit("setRegisterForm", false);
    },
    goToBikes() {
      if (this.$router.currentRoute.name != "Bikes") {
        this.$router.push("/bikes");
      }
    },
    goToRentals() {
      if (this.$router.currentRoute.name != "Rentals") {
        this.$router.push("/rentals");
      }
    },
    goToMyRentals() {
      if (this.$router.currentRoute.name != "MyRentals") {
        this.$router.push("/my-rentals");
      }
    },
    goToTerms() {
      if (this.$router.currentRoute.name != "Terms") {
        this.$router.push("/terms-and-conditions");
      }
    }
  },
  computed: {
    ...mapGetters(["logged", "user", "showLoginForm", "userAlreadyExist"])
  }
};
</script>

<style>
.bg-dark {
  background-color: #3f88d1 !important;
}
</style>