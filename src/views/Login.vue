<template>
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Login</h3>
        <p class="subtitle has-text-grey">Please login to proceed.</p>
        <div id="login" class="box">
          <form>
            <div class="field">
              <div class="control">
                <input class="input is-large" v-model="email" type="email" placeholder="Your Email" autofocus="">
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input class="input is-large" v-model="password" type="password" placeholder="Your Password">
              </div>
            </div>
            <div class="field">
              <label class="checkbox">
                <input type="checkbox" v-model="remember_me">
                Remember me
              </label>
            </div>
            <a class="button is-block is-info is-large is-fullwidth" v-on:click="clickToLogin()">Login</a>
          </form>
        </div>
        <!--<p class="has-text-grey">
            <a href="../">Sign Up</a> &nbsp;·&nbsp;
            <a href="../">Forgot Password</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>-->
      </div>
    </div>
  </div>
</section>
</template>

<script>
import * as rest from '@/modules/Rest.js';
export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
      remember_me: false
    }
  },
  methods: {
    clickToLogin: function() {
      rest.auth(this.email, this.password).then(res=>{
        this.$router.push("/ingredients")
      });
    }
  }
}
</script>
