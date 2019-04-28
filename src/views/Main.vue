<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation" id="realEstateMenu">
		<div class="navbar-brand">
			<a class="navbar-item" href="https://bulma.io">
				<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
			</a>

			<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navBarMenu"
      v-bind:class="{ 'is-active' : burgerIsActive }" v-on:click="burgerIsActive = !burgerIsActive">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div id="navBarMenu" class="navbar-menu" v-bind:class="{'is-active': burgerIsActive}">
			<div class="navbar-start">
				<router-link class="navbar-item" to="/ingredients">
					Ингредиенты
				</router-link>
				<router-link class="navbar-item" to="/about">
					Примеры
				</router-link>
			</div>
			<div class="navbar-end">
        <div class="navbar-item">
          <a class="button is-light" v-on:click="logout()">
            Выход
          </a>
        </div>
			</div>
		</div>
	</nav>
    <router-view/>
  </div>
</template>

<script>
  import * as rest from '@/modules/Rest.js';
  export default {
    name: 'Main',
    data() {
      return {
          burgerIsActive: false
      }
    },
    methods: {
      logout: function() {
        rest.logout();
        this.$router.push("/login");
      }
    }
  }
</script>

<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
