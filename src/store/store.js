import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import { buildHeaders } from "../helpers/helpers"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        logged: false,
        sendTweet: false,
        modal: false,
        basicData: "",
        token: localStorage.getItem('atid'),
        followers: [],
        friends: [],
        tweets: [],
        loading: {
            followers: false,
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
    },
    mutations: {
        setUserStatus(state, payload) {
            state.logged = payload;
        },
        setUserToken(state, payload) {
            state.token = payload;
            localStorage.setItem('atid', payload);
        },
        loadingOn(state, payload){
            state.loading[payload] = true;
        },
        loadingOff(state, payload){
            state.loading[payload] = false;
        },
        setBasicData(state, payload) {
            state.basicData = payload;
        },
        setFollowersList(state, payload) {
            state.followers = payload;
        },
        setFriendsList(state, payload) {
            state.friends = payload;
        },
        setTweetsList(state, payload) {
            state.tweets = payload;
        },
        setErrors(state, payload) {
            state.errors[payload.component].status = payload.status;
            state.errors[payload.component].content = payload.content;
        },
        sendTweet(state, payload) {
            state.sendTweet = payload;
        },
        hideModal(state, payload) {
            state.modal = false;
        },
        showModal(state, payload) {
            state.modal = true;
        }
    },
    actions: {
        checkAuthorization(context, payload) {
            if(context.state.token !== null) {
                context.commit("setUserStatus", true);
            } else if (payload.atid) {
                context.commit("setUserToken", payload.atid);
                context.commit("setUserStatus", true);
            } else {
                context.commit("setUserStatus", false);
            }

        },
        getBasicData(context, payload) {
            let url = "http://localhost:8888/init";

            axios.get(url, { headers: buildHeaders(context.state.token) })
            .then(response => {
                let user_data = JSON.parse(response.data);
                context.commit("setBasicData", user_data)
            })
        },
        getFollowersList(context, payload) {
            context.commit("loadingOn", "followers");
            let followers = "http://localhost:8888/followers";

            axios.get(followers, { headers: buildHeaders(context.state.token) })
            .then(response => {
                context.commit("loadingOff", "followers");
                let data = JSON.parse(response.data);
                if(data.status == 'OK') {
                    context.commit("setErrors", { component: "followers", status: false, content: data.errors });
                    context.commit("setFollowersList", data.data);

                } else {
                    context.commit("setErrors", { component: "followers", status: true, content: data.errors });
                }
            })
        },
        getFriendsList(context, payload) {
            context.commit("loadingOn", "friends");
            let followers = "http://localhost:8888/friends";

            axios.get(followers, { headers: buildHeaders(context.state.token) })
            .then(response => {
                context.commit("loadingOff", "friends");
                let data = JSON.parse(response.data);
                if(data.status == 'OK') {
                    context.commit("setErrors", { component: "friends", status: false, content: data.errors });
                    context.commit("setFriendsList", data.data);

                } else {
                    context.commit("setErrors", { component: "friends", status: true, content: data.errors });
                }
            })
        },
        getTweetsList(context, payload) {
            context.commit("loadingOn", "tweets");
            let followers = "http://localhost:8888/tweets";

            axios.get(followers, { headers: buildHeaders(context.state.token) })
            .then(response => {
                context.commit("loadingOff", "tweets");
                let data = JSON.parse(response.data);
                if(data.status == 'OK') {
                    context.commit("setErrors", { component: "tweets", status: false, content: data.errors });
                    context.commit("setTweetsList", data.data);

                } else {
                    context.commit("setErrors", { component: "tweets", status: true, content: data.errors });
                }
            })
        },
        sendTweet(context, payload) {
            let url = "http://localhost:8888/update";
            let data = {status: payload};
            axios.post(url, data, { headers: buildHeaders(context.state.token) })
            .then(response => {
                  if (response.status == 200) {
                      context.commit("sendTweet", true);
                      setTimeout(function() {
                          context.commit("hideModal");
                          context.commit("sendTweet", false);
                      }, 1000);
                      context.dispatch("getTweetsList");

                  }
              })
        },
        showModal(context, payload) {
            context.commit("showModal");
        },
        hideModal(context, payload) {
            context.commit("hideModal");
        }

    }
});
