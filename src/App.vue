<template>
    <div id="app" v-cloak >
        <template v-if="logged">
            <Navbar :user_data="user_data" @showModal="showModal"/>

            <transition name="fade">
                <Modal  v-if="this.modal"  @hideModal="hideModal" @sendTweet="sendTweet" :tweet_send="tweet_send"/>
            </transition>

            <v-container text-xs-center grid-list-md>
                <v-layout row wrap>
                    <Followers :followers="followers"/>
                    <Tweets :tweets="tweets"/>
                    <Friends :friends="friends"/>
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
      logged: false,
      user_data: {},
      token: "",
      followers: [],
      friends: [],
      tweets: [],
      modal: false,
      tweet_send: false

  }),
  methods: {
      checkAuthorization: function () {
          if(localStorage.getItem('atid')) {
              this.logged = true;
              this.token = localStorage.getItem('atid');
              this.loadData();
          } else if (this.$route.query.atid) {
              this.token = this.$route.query.atid;
              localStorage.setItem('atid', this.token)
              this.logged = true;
              this.loadData();
          } else {
              this.logged = false;
          }

      },
      loadData: function () {
          this.getBasicData();
          this.getFollowersList();
          this.getFriendsList();
          this.getTweetsList();
      },
      showModal: function () {
          this.modal = true;
      },
      hideModal: function () {
          this.modal = false;
          this.tweet_send = false;
      },
      sendTweet: function (tweetText) {
          let url = "http://localhost:8888/update";
          let data = {status: tweetText};

          axios.post(url, data, { headers: buildHeaders(this.token) })
          .then(response => {
              if (response.status == 200) {
                  this.tweet_send = true;
                  setTimeout(this.getTweetsList, 500);
                  setTimeout(this.hideModal, 1000);

              }
          })
      },
      getBasicData: function() {
          let url = "http://localhost:8888/init";

          axios.get(url, { headers: buildHeaders(this.token) })
          .then(response => {
              this.user_data = JSON.parse(response.data);
          })

      },

      getFollowersList: function() {
          let followers = "http://localhost:8888/followers";

          axios.get(followers, { headers: buildHeaders(this.token) })
          .then(response => {
              return this.followers = JSON.parse(response.data);
          })
      },
      getFriendsList: function() {
          let followers = "http://localhost:8888/friends";

          axios.get(followers, { headers: buildHeaders(this.token)})
          .then(response => {
              return this.friends = JSON.parse(response.data);
          })
      },
      getTweetsList: function() {
          let followers = "http://localhost:8888/tweets";

          axios.get(followers, { headers: buildHeaders(this.token)})
          .then(response => {
              return this.tweets = JSON.parse(response.data);
          })
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
      this.checkAuthorization();
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

</style>
