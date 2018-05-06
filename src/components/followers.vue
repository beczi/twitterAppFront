
<template>
    <v-flex xs12 sm4 >
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Obserwujący</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(follower, index) in followers" v-if="followers.length">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="follower.profile_image_url" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title v-html="follower.name"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="index" v-if="index < followers.length-1"></v-divider>
          </template>
          <template v-else>
              <p>Brak obserwujących</p>
          </template>
        </v-list>
      </v-card>
    </v-flex>
</template>

<script>

    export default {
        name: "Followers",
        props: ["followers"]

    }

</script>
