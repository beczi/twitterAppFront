<template>
    <v-flex xs12 sm4 >
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Twoje ostatnie tweety</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(tweet,index) in tweets" v-if="tweets.length">
            <v-subheader v-html="dateTransform(tweet.created_at)"></v-subheader>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/logo.svg" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title v-html="tweet.text"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="index" v-if="index < tweets.length - 1"></v-divider>
          </template>
          <template v-else>
              <p>Brak tweetów</p>
          </template>
        </v-list>
      </v-card>
    </v-flex>
</template>

<script>
    import { displayDate } from "../helpers/helpers"

    export default {
        name: "Tweets",
        props: ["tweets"],
        methods: {
            dateTransform: function(dateStr) {
                return displayDate(dateStr)
            }
        }
    }
</script>
<style scoped>
    .avatar img {
        border-radius: 0;
    }

</style>
