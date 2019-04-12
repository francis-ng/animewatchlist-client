<template>
  <nav class="pure-g">
    <div class="pure-u-1 pure-u-md-1-4">
      <div class="pure-menu">
        <a href="#" class="pure-menu-heading">Tracker</a>
      </div>
    </div>
    <div class="pure-u-1 pure-u-md-1-2 centered">
      <div class="pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <a href="#" class="pure-menu-link" ref="season_label">Season</a>
            <ul id="season-list-nav" class="pure-menu-children pure-menu-scrollable">
              <li v-for="season in seasons" class="pure-menu-item" :ref="`li_${season.replace(/\s/g, '_').toLowerCase()}`" @click="selectSeason(season)"><a href="#" class="pure-menu-link">{{ season }}</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="pure-u-1 pure-u-md-1-4 right-aligned">
      <div class="pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <a href="#" id="user-name" class="pure-menu-link" ref="user_name">User</a>
            <ul class="pure-menu-children">
              <li class="pure-menu-item" @click="logout"><a href="#" class="pure-menu-link">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="pure-u-1" id="login-overlay">
      <div class="login-container">
        <form
          id="login-form"
          class="pure-form pure-form-aligned"
          @submit.prevent="login"
        >
          <fieldset>
            <h2>Login</h2>
            <div class="pure-control-group">
              <label for="txt-login-username">Username</label>
              <input id="txt-login-username" type="text" ref="login_username" required pattern="[A-Za-z0-9]{4,16}" />
            </div>
            <div class="pure-control-group">
              <label for="txt-login-password">Password</label>
              <input id="txt-login-password" type="password" ref="login_password" required pattern=".{8,16}" />
            </div>
            <div class="pure-controls">
              <button
                type="submit"
                class="pure-button pure-button-primary"
              >Submit
              </button>
            </div>
            <div class="pure-controls">
              <a href="#" @click="showRegisterForm">Click here to register</a>
            </div>
          </fieldset>
        </form>
        <form
          id="register-form"
          class="pure-form pure-form-aligned"
          @submit.prevent="register"
          style="display: none;"
        >
          <fieldset>
            <h2>Register</h2>
            <div class="pure-control-group">
              <label for="txt-reg-email">Email</label>
              <input id="txt-reg-email" type="email" ref="register_email" />
            </div>
            <div class="pure-control-group">
              <label for="txt-reg-username">Username</label>
              <input id="txt-reg-username" type="text" ref="register_username" required pattern="[A-Za-z0-9]{4,16}" />
            </div>
            <div class="pure-control-group">
              <label for="txt-reg-password">Password</label>
              <input id="txt-reg-password" type="password" ref="register_password" required pattern=".{8,16}" />
            </div>
            <div class="pure-controls">
              <button
                type="submit"
                class="pure-button pure-button-primary"
              >Submit
              </button>
            </div>
            <div class="pure-controls">
              <a href="#" @click="showLoginForm">Click here to return to login</a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  data () {
    return {
      seasons: []
    }
  },
  dependencies: ['getWatchListService', 'addSeasonService'],
  methods: {
    getSeasons () {
      const path = `https://sphr-animewatchlist.herokuapp.com/seasons/get`
      axios
        .post(path, { user: this.$refs.username })
        .then(response => {
          let unique = new Set()
          response.data.Items.forEach((value) => {
            unique.add(value['season'])
          })
          this.seasons = [...unique]
        })
        .catch(error => {
          console.log(error)
        })
    },
    addSeason (season) {
      this.seasons.unshift(season)
    },
    selectSeason (season) {
      console.log('Selecting ' + season)
      let formattedSeason = season.replace(/\s/g, '_').toLowerCase()
      let element = this.$refs['li_' + formattedSeason]
      $('#season-list-nav li').removeClass('active-season')
      $(element).addClass('active-season')
      this.$refs.season_label.textContent = season
      this.getWatchListService.getWatchList(this.$refs.username, season)
    },
    logout () {

    },
    verifyLogin () {
      const path = `https://sphr-animewatchlist.herokuapp.com/auth/verify`
      axios
        .post(path)
        .then(response => {
          if (response.data.result === 'Authenticated') {
            this.$refs.username = response.data.username
            $('#user-name').text(response.data.username)
            $('#login-overlay').css('display', 'none')
            this.getSeasons()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    login () {
      const path = `https://sphr-animewatchlist.herokuapp.com/auth/login`
      let request = {
        username: this.$refs.login_username.value,
        password: this.$refs.login_password.value
      }
      axios
        .post(path, request)
        .then(response => {
          if (response.data.result === 'Authenticated') {
            this.$refs.username = request.username
            $('#user-name').text(request.username)
            $('#login-overlay').css('display', 'none')
            this.getSeasons()
          } else {
            // show failed message
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    register () {
      const path = `https://sphr-animewatchlist.herokuapp.com/auth/register`
      let request = {
        username: this.$refs.register_username.value,
        password: this.$refs.register_password.value,
        email: this.$refs.register_email.value
      }
      axios
        .post(path, request)
        .then(response => {
          if (response.data.result === 'Success') {
            this.showLoginForm()
          } else {
            // show failed message
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    showRegisterForm () {
      $('#login-form').css('display', 'none')
      $('#register-form').css('display', 'block')
    },
    showLoginForm () {
      $('#login-form').css('display', 'block')
      $('#register-form').css('display', 'none')
    }
  },
  created () {
    this.addSeasonService.addSeason = this.addSeason
  },
  mounted () {
    this.verifyLogin()
  },
  updated () {
    this.$nextTick(() => {
      if (this.seasons.length > 0) {
        this.selectSeason(this.seasons[0])
      }
    })
  }
}
</script>
