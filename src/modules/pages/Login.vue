<template>
  <transition appear name="slide-fade">
    <div class="centered" style="height: 100vh;">
      <div class="card" style="margin: 50px;">
        <img src="/src/assets/img/logo1.png" alt="">
      </div>

      <div class="card column login">
        <form class="smart-form" @submit.prevent="login">
          <header>
            <h2>Sign In</h2>
          </header>
          <fieldset>
            <section>
              <label class="label">Username</label>
              <label class="input">
                <i class="icon-append fa fa-user"></i>
                <input type="text" required v-model="username">
                <b class="tooltip tooltip-top-right">
                  <i class="fa fa-user txt-color-teal"></i>
                  Please enter username
                </b>
              </label>
            </section>

            <section>
              <label class="label">Password</label>
              <label class="input">
                <i class="icon-append fa fa-lock"></i>
                <input type="password" required v-model="password">
                <b class="tooltip tooltip-top-right">
                  <i class="fa fa-lock txt-color-teal"></i> Enter your password</b>
              </label>

            </section>

            <section>
              <label class="checkbox">
                <input type="checkbox" name="remember" checked="" v-model="stayIn">
                <i></i>Stay signed in
              </label>
            </section>

          </fieldset>
          <footer>
            <button type="submit" class="btn btn-success" :disabled="loginProcessing">
              <img src="/src/assets/img/Spinner.svg" height="35" v-show="loginProcessing">
              Sign in
            </button>
          </footer>
        </form>
      </div>

    </div>
  </transition>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "grobot",
      password: "raspberry",
      stayIn: false,
      loginProcessing: false
    };
  },
  methods: {
    login() {
      this.loginProcessing = true;
      this.$store.dispatch("LOGIN_USER", {
        username: this.username,
        password: this.password
      });
      setTimeout(()=>this.loginProcessing = false, 3000);
    },
    logout() {
      this.$store.dispatch("LOGOUT_USER");
    }
  },
  computed: {
    ...mapGetters(['GET_SENSORS_DATA', 'getVersion'])
  }
};
</script>


<style scoped>
  .centered {
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
  }

  .card {
    background-color: white;
    border-radius: 15px;
    box-shadow: 1px 1px 7px 1px grey;
    padding: 10px;
  }

  @media screen and (max-width: 720px) {
    .login {
      width: 90vw;
      margin-top: 50px;
    }
  }

  @media screen and (min-width: 721px) and (max-width: 1280px){
    .login {
      width: 50vw;
      margin-top: 50px;
    }
  }

  @media screen and (min-width: 1281px){
    .login {
      width: 30vw;
      margin-top: 50px;
    }
  }
</style>
