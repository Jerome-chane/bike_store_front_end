import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    bikes: [],
    myRentals: null,
    user: null,
    showLoginForm: false,
    showRegisterForm: false,
    logged: false,
    userAlreadyExist: false,
    cart: [],
    duration: 1,
    email: "",
    pwd: "",
    sellerProducts: null
  },
  getters: {
    myRentals: state => state.myRentals,
    sellerProducts: state => state.sellerProducts,
    bikes: state => state.bikes,
    duration: state => state.duration,
    cart: state => state.cart,
    logged: state => state.logged,
    user: state => state.user,
    showLoginForm: state => state.showLoginForm,
    showRegisterForm: state => state.showRegisterForm,
    userAlreadyExist: state => state.userAlreadyExist,
    email: state => state.email,
    password: state => state.pwd
  },
  mutations: {
    setMyRentals: (state, payload) => {
      state.myRentals = payload;
    },
    emptyCart: state => (state.cart = []),
    setSellerProducts: (state, payload) => (state.sellerProducts = payload),
    setBikes: (state, payload) => (state.bikes = payload),
    setDuration: (state, payload) => (state.duration = payload),
    removeItem: (state, payload) => {
      state.cart.splice(payload, 1);
    },
    syncEmail: (state, payload) => (state.email = payload),
    syncPwd: (state, payload) => (state.pwd = payload),
    setLoginForm: (state, payload) => (state.showLoginForm = payload),
    setRegisterForm: (state, payload) => (state.showRegisterForm = payload),
    setUserAlreadyExist: (state, payload) => (state.userAlreadyExist = payload),
    setAuthorized: (state, payload) => (state.authorized = payload),
    syncLogged: (state, payload) => {
      state.logged = payload;
      if (payload == false) {
        state.user = null;
      }
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    addToCart: (state, payload) => {
      state.cart.push(payload);
      console.log("cart updated ", state.cart);
    }
  },
  actions: {
    signUp({ commit, dispatch }, payload) {
      let ourData = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        role: payload.role
      };

      fetch(`api/signup`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(ourData)
      })
        .then(newData => {
          return newData.json();
        })
        .then(data => {
          if (data.hasOwnProperty("error")) {
            console.log(" error: ", data);
            commit("setUserAlreadyExist", true);
          } else {
            commit("setUserAlreadyExist", false);
            commit("syncEmail", ourData.email);
            commit("syncPwd", ourData.password);
            commit("setLoginForm", false);
            commit("setRegisterForm", false);
            dispatch("login");
          }
        })
        .catch(error => {
          console.log("Request failure: ", error);
        });
    },
    login({ getters, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        let ourData = { email: getters.email, pwd: getters.password };
        return fetch(`/api/login`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          body: getBody(ourData)
        })
          .then(data => {
            if (data.status == 200) {
              commit("setLoginForm", false);
              commit("setRegisterForm", false);
              commit("syncLogged", true);
            } else {
              reject(new Error("error"));
            }
            // console.log("Log status", getters.logged);
          })
          .then(newData => {
            dispatch("getBikes");
            try {
              return resolve({ status: "success" });
            } catch {
              reject(new Error("error"));
            }
          })
          .catch(error => {
            console.log("Request failure ", error);
          });
        function getBody(json) {
          var body = [];
          for (var key in json) {
            var encKey = encodeURIComponent(key);
            var encVal = encodeURIComponent(json[key]);
            body.push(encKey + "=" + encVal);
          }
          return body.join("&");
        }
      });
    },
    logout({ commit }) {
      fetch(`api/logout`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        credentials: "include"
      })
        .then(data => {
          if (data.status == 200) {
            commit("syncLogged", false);
          }
        })
        .then(() => {
          commit("setUser", null);
          console.log("log Out successful");
        })
        .catch(error => console.log("Error ", error));
    },
    getBikes({ commit }) {
      return new Promise((resolve, reject) => {
        // fetch run when Home is Loaded. returns a promise
        return fetch(`api/bikes`, {
          credentials: "include"
        })
          .then(data => {
            if (data.ok) {
              return data.json();
            } else {
              reject(new Error("error"));
            }
          })
          .then(newData => {
            console.log(newData);
            commit("setBikes", newData.bikes);
            if (newData.user != null) {
              commit("setUser", newData.user); // CHECK IF the newData contains a USER. IF yes, returns a "logged" message
              try {
                return resolve({ status: "logged" });
              } catch {
                reject(new Error("error"));
              }
            }
            if (!newData.user) {
              try {
                return resolve({ status: "no user found" }); // CHECK IF the newData contains a USER. IF NO, returns a ""no user found"" message
              } catch {
                reject(new Error("error"));
              }
            }
          })
          .catch(error => console.log(error));
      });
    },
    rent({ getters, commit }) {
      let data = getters.cart;
      let duration = getters.duration;

      fetch(`rent/${duration}/days`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      })
        .then(data => {
          console.log(data);
          return data.json();
        })
        .then(newData => {
          console.log(newData);
          if (newData.success) {
            commit("emptyCart");
          }
        })
        .catch(error => console.log(error));
    },
    getMyRentals({ commit, getters }) {
      fetch(`my-rentals`, {
        credentials: "include"
      })
        .then(data => {
          if (data.ok) {
            return data.json();
          }
        })
        .then(newData => {
          console.log(newData);
          commit("setMyRentals", newData.ok.rentals);
          console.log("rentals: ", getters.myRentals);
        })
        .catch(error => console.log(error));
    },
    returnBike({ dispatch }, payload) {
      let duration = payload.duration;
      fetch(`return/rental/${payload.rental}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(duration)
      })
        .then(data => {
          console.log(data);
          return data.json();
        })
        .then(newData => {
          console.log(newData);
          dispatch("getMyRentals");
        })
        .catch(error => console.log(error));
    }
  },
  modules: {}
});
