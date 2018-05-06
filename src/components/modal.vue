<template>
    <div class="modal" >
      <template>
          <v-btn icon class="close-icon" @click="hideModal">
            <v-icon>close</v-icon>
          </v-btn>
          <h2 class="modal__title">Tweetnij coś!</h2>

        <v-form  ref="form" lazy-validation class="modal__form">
          <v-text-field
            v-model="tweet"
            placeholder="Co się dzieje"
          ></v-text-field>

          <v-btn
            @click="submit"
            :disabled="!validation"
            class="modal__btn"
            >
            Tweetnij
          </v-btn>
        </v-form>
      </template>
      <div v-show="tweet_send" class="modal__info">Twój Tweet zostal wyslany</div>
    </div>

</template>

<script>
    export default {
        name: "Modal",
        data: () => ({
            tweet: ''

        }),
        props: ["tweet_send"],
        computed: {
            validation: function() {
                return this.tweet.length > 0
            }
        },
        methods: {
            submit () {
                this.$emit("sendTweet", this.tweet);
            },

            hideModal() {
                this.$emit("hideModal");
            }
        }
    }
</script>

<style scoped>

    .modal {
      background-color: #5f55b1;
        width: 100%;
        z-index: 999;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        flex-direction: column;
        padding: 2em;
        color: #ffffff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    @media all and (min-width: 700px) {
        .modal {
            width: 40%;
        }
    }

    .modal__title {
        margin-bottom: 1em;
    }

    .modal__form {
        background-color: #ffffff;
        color: #000000;
        color: #000000;
        padding: 0 2em;
    }

    .modal__info {
        z-index: 999;
        text-align: center;
        background-color: #dc74ad;
        color: #ffffff;
        padding: 1em;
    }

    .close-icon {
        align-self: flex-end;
    }

    .modal__btn {
        background-color: #49c3b8;
        color: #ffffff;
    }
</style>
