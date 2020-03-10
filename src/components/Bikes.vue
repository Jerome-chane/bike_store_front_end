<template>
  <div>
    <NavBar />
    <div class="container bikes">
      <div v-for="(bike,index) in bikes" :key="index">
        <div class="single_product">
          <img v-bind:src="bike.image" class="img" />
          <p>{{bike.model}}</p>
          <p>Category: {{bike.brand}}</p>
          <p>{{bike.type}}</p>
          <p>Available: {{bike.inventory}}</p>
          <p>Price: {{bike.base_price}}€</p>

          <p class="btn btn-info" @click="add(bike)">Add to Cart</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/Navbar";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: { NavBar },
  methods: {
    add(bike) {
      this.$store.commit("addToCart", bike);
    }
  },
  computed: {
    ...mapGetters(["bikes", "user"])
  },
  created() {
    this.$store.dispatch("getBikes").then(response => {
      if (response != "logged" && this.user != null) {
        this.$store.dispatch("login");
      }
    });
  }
};
</script>

<style scoped>
.bikes {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.single_product {
  margin: 30px;
}
img {
  height: 300px;
}
</style>