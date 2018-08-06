<template>
    <div id="app" v-cloak >
        <template v-if="logged">
            <Navbar :user_data="user_data" @showModal="showModal"/>

            <transition name="fade">
                <Modal  v-if="this.modal"  @hideModal="hideModal" @sendTweet="sendTweet" :tweet_send="tweet_send"/>
            </transition>

            <v-container text-xs-center grid-list-md>
                <v-layout row wrap>

                    <Followers :followers="followers" :loading="loading" :errors="errors.followers"/>
                    <Tweets :tweets="tweets" :isLoading="loaders.tweets" :errors="errors.tweets"/>
                    <Friends :friends="friends" :isLoading="loaders.friends" :errors="errors.friends"/>
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
import { loading } from "./mixins/mixins";
import { modal } from "./mixins/mixins";

export default {
  name: 'App',
  mixins: [loading, modal],
  data: () => ({
    //   logged: false,
      user_data: {},
      token: "",
      followers: [],
      friends: [],
      tweets: [],
      tweet_send: false,
      loaders: {
          friends: false,
          tweets: false
      },
      errors: {
          followers: {
              status: false,
              content: []
          },
          friends: {
              status: false,
              content: []
          },
          tweets: {
              status: false,
              content: []
          },
          navbar: {
              status: false,
              content: []
          }
      }

  }),
  computed: {
      logged() {
          return this.$store.state.logged;
      }
  },
  methods: {
      checkAuthorization: function () {
          if(localStorage.getItem('atid')) {
              this.$store.state.logged = true;
              this.token = localStorage.getItem('atid');
              this.loadData();
          } else if (this.$route.query.atid) {
              this.token = this.$route.query.atid;
              localStorage.setItem('atid', this.token)
              this.$store.state.logged = true;
              this.loadData();
          } else {
              this.$store.state.logged = false;
          }

      },
      loadData: function () {
          this.getBasicData();
          this.getFollowersList();
          this.getFriendsList();
          this.getTweetsList();
      },
      showModal: function () {
          this.toggleModal();
      },
      hideModal: function () {
          this.toggleModal();
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
          this.toggleLoading();
          let followers = "http://localhost:8888/followers";

          axios.get(followers, { headers: buildHeaders(this.token) })
          .then(response => {
              this.toggleLoading();
              let data = JSON.parse(response.data);
            //   console.log(data);
              if(data.status == 'OK') {
                  this.errors.followers.status = false;
                  return this.followers = data.data;

              } else {
                  this.errors.followers.status = true;
                  return this.errors.followers.content = data.errors;
              }
          })
      },
      getFriendsList: function() {
          this.loaders.friends = true;
          let followers = "http://localhost:8888/friends";

          axios.get(followers, { headers: buildHeaders(this.token)})
          .then(response => {
              this.loaders.friends = false;
              let data = JSON.parse(response.data);
              if(data.status == 'OK') {
                  this.errors.friends.status = false;
                  return this.friends = data.data;

              } else {
                  this.errors.friends.status = true;
                //   console.log(this.errors.friends);
                  return this.errors.friends.content = data.errors;
              }


          })
      },
      getTweetsList: function() {
          let followers = "http://localhost:8888/tweets";
           this.loaders.tweets = true;
          axios.get(followers, { headers: buildHeaders(this.token)})
          .then(response => {
              this.loaders.tweets = false;
              let data = JSON.parse(response.data);
            //   console.log(data);
              if(data.status == 'OK') {
                  this.errors.tweets.status = false;
                  return this.tweets = data.data;

              } else {
                  this.errors.tweets.status = true;
                  console.log(data.errors);
                  return this.errors.tweets.content = data.errors;
              }
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
    .list__tile__sub-title, .list__tile__title {
        white-space: normal;
    }
    .progress-circular {
        margin: 2em auto;
        color: #046cf0;
    }

</style>
