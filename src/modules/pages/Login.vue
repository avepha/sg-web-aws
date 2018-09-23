<template>
  <div style="height: 100vh;">
    <header id="header" style="height: 70px; background:#f4f4f4!important">
      <div id="extr-page-header-space">
        <span style="font-size: 25px; font-weight: bold;">
          <img src="/src/assets/img/logo1.png" alt=""> </span>
      </div>
      <span id="extr-page-header-space">
        <!-- <span class="hidden-mobile hiddex-xs">Need an account?</span> -->
        <span><a class="btn btn-default">Device</a></span>
      </span>
    </header>
    
    <div class="container-fluid" style="margin-top: 100px;">
      <div class="row" >
            <div class="well no-padding col-md-4 col-lg-4" style="float: none; margin: 0 auto;">
              <form action="index.html" id="login-form" class="smart-form client-form">
                <header>
                  Sign In
                </header>
                <fieldset>
                  <section>
                    <label class="label">Username</label>
                    <label class="input">
                      <i class="icon-append fa fa-user"></i>
                      <input type="email" name="email" v-model="username">
                      <b class="tooltip tooltip-top-right">
                        <i class="fa fa-user txt-color-teal"></i> Please enter username</b>
                    </label>
                  </section>

                  <section>
                    <label class="label">Password</label>
                    <label class="input">
                      <i class="icon-append fa fa-lock"></i>
                      <input type="password" name="password"  v-model="password">
                      <b class="tooltip tooltip-top-right">
                        <i class="fa fa-lock txt-color-teal"></i> Enter your password</b>
                    </label>
                    
                  </section>

                  <section>
                    <label class="checkbox">
                      <input type="checkbox" name="remember" checked="" v-model="stayIn">
                      <i></i>Stay signed in</label>
                  </section>
                </fieldset>
                <footer>
                  <button type="button" class="btn btn-success" @click="login" :disabled="loginProcessing">
                  <img src="/src/assets/img/Spinner.svg" height="35" v-show="loginProcessing">
                    Sign in
                  </button>
                  <!-- <button type="button" class="btn btn-default" @click="logout">
                    Sign out
                  </button> -->
                </footer>
              </form>

            </div>
      </div>
    </div>

  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "grobotg",
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
    ...mapGetters(['GET_SENSORS_DATA'])
  }
};
</script>

<style scoped>
.fill { 
    min-height: 100%;
    height: 100%;
}

</style>

