<template>
    <v-container text-xs-center class="login">
        <h1 class="header">Witaj w aplikacji!</h1>
        <img src="../assets/logo.svg" class="logo">
        <a href="http://localhost:8888/login" class="login-btn">Zaloguj się przez Twittera</a>
    </v-container>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>
.login {
    padding-top: 2em;
}
.login-btn {
    font-size: 1.2rem;
    text-decoration: none;
    background-color: #1fa0f3;
    color: #ffffff;
    display: inline-block;
    padding: 1em;
    font-weight: 500;
    margin: 1em auto;
}
.logo {
    max-width: 80px;
display: block;
margin: 0 auto;
}
.header {
    margin-bottom: 1em;
}
</style>
