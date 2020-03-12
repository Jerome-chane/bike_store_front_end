<template>
  <div>
    <NavBar />
    <br />
    <!-- <div class="container"> -->
    <h1>My Rentals</h1>
    <!-- <p
        v-if="logged != true && user == null"
        class="alert alert-info"
      >You must be logged to see your rentals</p>
    </div>-->
    <!-- v-if="logged&&user" -->
    <div class="container">
      <p v-if="myRentals.length ==0 " class="alert alert-info">You have no rentals to see</p>
      <div class="container" v-if="myRentals.length >0 ">
        <div v-for="(rental,index) in myRentals" :key="index" class="rentals">
          <hr />
          <div class="row">
            <div class="col-6">
              <p>Rental reference: {{rental.id}}</p>
              <p>Status: "{{rental.status}}"</p>

              <span v-for="(qty,id) in rental.quantities" :key="id">
                <p>{{qty}}</p>
              </span>
              <p>Duration: {{rental.start_duration}} days</p>
              <p v-if="rental.final_duration">Final Duration: {{rental.final_duration}} days</p>
              <p>Start Price:{{rental.start_price}} €</p>
              <p v-if="rental.final_price">Final Price:{{rental.final_price}} €</p>
              <p>Start Date: {{rental.start_date}}</p>
              <p v-if="rental.return_date">Return Date: {{rental.return_date}}(fake)</p>
              <p
                v-if="rental.status == 'out'"
                class="btn btn-info"
                @click="returnBike(rental.id)"
              >Return Bike(s)</p>
            </div>
            <div class="col-6">
              <div v-for="(bike,i) in rental.rented_bike" :key="i">
                <div class="single_product">
                  <img v-bind:src="bike.image" class="img" />
                  <p>{{bike.model}}</p>
                </div>
              </div>
            </div>
          </div>
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
  computed: { ...mapGetters(["myRentals", "logged", "user"]) },
  methods: {
    returnBike(rental_id) {
      this.$prompt("what is the duration? ").then(text => {
        this.$store.dispatch("returnBike", {
          rental: rental_id,
          duration: text
        });
      });
    }
  },
  created() {
    this.$store.dispatch("getMyRentals");
  }
};
</script>

<style scoped>
img.img {
  height: 90px;
}
</style>