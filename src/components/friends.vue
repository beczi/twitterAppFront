<!-- <template>

    <v-flex xs12 sm4>
         <v-card dark color="primary">
           <v-card-text class="px-0">
               <h2>Aktualnie obserwujesz</h2>
           </v-card-text>
           <v-card-text class="px-0 friends" v-if="friends.length">
             <div v-for="friend of friends" class="friend__box">
               <img class="nav__avatar" :src="friend.profile_image_url" >
               <span>{{friend.name}} </span>
             </div>
           </v-card-text>
           <div v-else>Brak obserwowanych</div>
         </v-card>
    </v-flex>

</template> -->

<template>
    <v-flex xs12 sm4 >
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Aktualnie obserwujesz</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line>
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
        </v-list>
      </v-card>
    </v-flex>
</template>
<script>

    export default {
        name: "Friends",
        props: ["friends"]
    }

</script>
