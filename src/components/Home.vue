<template>
  <div>
    <NavBar />
    <LoginForm />
    <img
      v-if="showLoginForm == false &&showRegisterForm==false"
      src="https://www.bimbimbikes.com/uploads/location/image/56b141a6dc18a_Blue%20Bike-18.JPG"
    />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";
import NavBar from "../components/Navbar";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: { NavBar, LoginForm },
  computed: {
    ...mapGetters(["showLoginForm", "showRegisterForm"])
  }
};
</script>

<style scoped>
img {
  width: -webkit-fill-available;
}
</style>