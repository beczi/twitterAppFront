
<template>
    <v-flex xs12 sm4 >
        <v-card>
        <v-toolbar>
          <v-toolbar-title>Obserwujący</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
        <v-list two-line v-else>
            <transition name="fade">
                <template v-show="errors.status" v-for="(error, index) in errors.content">
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-sub-title>{{ error }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="index" v-if="index < errors.length-1"></v-divider>
                </template>
                <template v-show="!errors.status">
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
                </template>

            </transition>
        </v-list>
        </v-card>
    </v-flex>
</template>

<script>

    export default {
        name: "Followers",

        props: ["followers", "errors", "loading"]

    }

</script>
