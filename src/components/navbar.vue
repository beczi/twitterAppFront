<template>
    <nav class="nav">
      <div >
        <span class="nav__name">{{ basicData.name }}</span>
        <span class="nav__login">{{ basicData.login }}</span>
      </div>
      <img class="nav__avatar" :src="basicData.avatar" >
      <v-btn @click="showModal" class="nav__btn">Tweetnij</v-btn>
    </nav>

</template>

<script>

export default {
    name: "Navbar",
    computed: {
        basicData() {
            return this.$store.state.basicData;
        }
    },
    methods: {
       showModal() {
           this.$store.dispatch("showModal");
       },
       getBasicData() {
           this.$store.dispatch("getBasicData");
       }
   },
   mounted() {
       this.getBasicData();
   }
}

</script>
<style >
    .nav {
        display: flex;
        padding: 1em;
        justify-content: flex-end;
        flex-wrap: wrap;
        align-items: center;
        background-color: #4ac3b8;
        color: #ffffff;
    }

    .nav__name, .nav__avatar {
        margin-right: 2em;
    }

    .nav__name {
        font-weight: 700;
        font-size: 1.3rem;
        display: block;
    }

    .nav__avatar {
        border-radius: 100%;
    }

    .nav__btn {
        background-color: #046cf0;
        color: #ffffff;
    }
</style>
