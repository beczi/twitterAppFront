<template>
    <v-flex xs12 sm4 >
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Aktualnie obserwujesz</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
        <v-list two-line v-else>
            <template v-show="errors.status" v-for="(error, index) in errors.content">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>{{ error }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider :key="index" v-if="index < errors.length-1"></v-divider>
            </template>
            <template v-show="!errors.status">
              <template v-for="(friend, index) in friends" v-if="friends.length">
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img :src="friend.profile_image_url" >
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-sub-title v-html="friend.name"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider :key="index" v-if="index < friends.length-1"></v-divider>
              </template>
              <template v-else>
                  <p>Brak obserwowanych</p>
              </template>
          </template>
        </v-list>
      </v-card>
    </v-flex>
</template>
<script>

    export default {
        name: "Friends",
        methods: {
            getFriendsList() {
                this.$store.dispatch("getFriendsList");
            }
        },
        computed: {
            friends() {
                return this.$store.state.friends;
            },
            loading() {
                return this.$store.state.loading.friends;
            },
            errors() {
                return this.$store.state.errors.friends;
            },
        },
        mounted() {
            this.getFriendsList();
        }
    }

</script>
