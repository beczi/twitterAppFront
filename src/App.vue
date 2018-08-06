<template>
    <div id="app" v-cloak >

        <template v-if="logged">
            <Navbar/>

            <transition name="fade">
                <Modal  v-if="this.modal"/>
            </transition>

            <v-container text-xs-center grid-list-md>
                <v-layout row wrap>
                    <Followers/>
                    <Tweets/>
                    <Friends/>
                 </v-layout>
            </v-container>
        </template>

        <template v-else>
            <Login />
        </template>

    </div>
</template>

<script>
import axios from 'axios'

import { buildHeaders } from "./helpers/helpers"
import Navbar from "./components/Navbar"
import Followers from "./components/Followers"
import Friends from "./components/Friends"
import Tweets from "./components/Tweets"
import Modal from "./components/Modal"
import Login from "./components/Login"

export default {
  name: 'App',
  data: () => ({

  }),
  computed: {
      logged() {
          return this.$store.state.logged;
      },
      tweetSended() {
          return this.$store.state.sendTweet;
      },
      modal() {
          return this.$store.state.modal;
      }

  },
  components: {
      Navbar,
      Modal,
      Followers,
      Friends,
      Tweets,
      Login
  },

  mounted () {
      this.$store.dispatch("checkAuthorization", {atid: this.$route.query.atid });
  }

}
</script>

<style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

    }
    [v-cloak] {
        display: none;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .toolbar__content {
        background-color: #49c3b8;
        color: #ffffff;
    }
    hr {
        background-color: #e8e8e8;
    }
    .list__tile__sub-title, .list__tile__title {
        white-space: normal;
    }
    .progress-circular {
        margin: 2em auto;
        color: #046cf0;
    }

</style>
