<template>
  <div>
    <NavBar />
    <div class="container">
      <h1>Rent Now!</h1>
      <br />
      <br />
      <div class="items">
        <div v-for="(bike, index) in cart" :key="index">
          <div class="row">
            <div class="col-4">
              <img class="cover" :src="bike.image" />
            </div>
            <div class="col-4">
              <p>{{bike.model}}</p>
              <p>Category: {{bike.brand}}</p>
              <p>{{bike.type}}</p>
              <p>Available: {{bike.inventory}}</p>
            </div>

            <div class="col-4">
              <p>
                Quantity:
                <input v-model="bike.quantity" type="number" min="0" :max="bike.inventory" />
              </p>
              <p>Price: {{(bike.base_price*bike.quantity)}}€</p>

              <span class="btn btn-danger" @click="remove(index)">Remove</span>
            </div>
          </div>
          <hr />
        </div>
        <p v-if="this.cart.length>0" class="duration">
          Duration:
          <input v-if="this.cart.length>0" v-model="day" type="number" min="1" /> days
        </p>
        <p id="total_price" v-if="this.cart.length>0">Total: {{total}}€</p>

        <p v-if="this.cart.length==0" class="alert alert-info">Your shopping cart is empty</p>
        <br />
        <div class="actions">
          <p class="btn btn-info" @click="goBack">Go Back</p>
          <p class="btn btn-success" @click="buy">Confirm</p>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import NavBar from "../components/Navbar";
import { mapGetters } from "vuex";
export default {
  data() {
    return { tot: 0, day: 1 };
  },
  components: { NavBar },
  watch: {
    day() {
      this.$store.commit("setDuration", this.day);
    }
  },
  computed: {
    ...mapGetters(["cart", "duration"]),
    total() {
      // Calculates the total price based on each product price and quantity
      this.tot = 0;
      this.cart.forEach(bike => {
        this.tot += bike.base_price * bike.quantity * this.duration;
      });
      return this.tot;
    }
  },
  methods: {
    buy() {
      this.$store.dispatch("rent");
      this.day = 0;
      this.day = 1;
    },
    goBack() {
      this.$router.push("/");
    },
    remove(index) {
      this.$store.commit("removeItem", index);
    }
  },
  created() {
    this.tot = 0;
  }
};
</script>

<style scoped>
img {
  height: 200px;
}
.action {
  display: flex;
  justify-content: space-around;
}
.duration input {
  width: 40px;
}
</style>