<template>
    <div>
        <h3>Login</h3>
        <div v-if="error != undefined">
            <p>{{ error }}</p>
        </div>
        <input type="email" placeholder="Email" v-model="email"/><br>
        <input type="password" placeholder="Password" v-model="password"/><br>
        <button @click="login">Login</button>
    </div>
</template> 

<script>

import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: undefined
        }
    },

    methods: {
        login() {
            axios.post("http://localhost:8086/login", {
                email: this.email,
                password: this.password
            }).then((response) => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                this.$router.push({name: 'home'})
            }).catch((error) => {
                var msgError = error.response.data.err
                this.error = msgError
            })
        }
    }
}
</script>

<style scoped>
    input {
        margin: 0.5rem;
        padding: 0.5rem;
        width: 20rem;
    }
    button {
        margin: 0.7rem;
        padding: 0.5rem;
    }
</style>
