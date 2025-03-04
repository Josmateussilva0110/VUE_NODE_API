<template>
    <div>
        <h3>Registro de Usuário</h3>
        <div v-if="error != undefined">
            <p>{{ error }}</p>
        </div>
        <input type="text" placeholder="Username" v-model="name" /><br>
        <input type="email" placeholder="Email" v-model="email"/><br>
        <input type="password" placeholder="Password" v-model="password"/><br>
        <button @click="register">Register</button>
    </div>
</template> 

<script>

import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            error: undefined
        }
    },

    methods: {
        register() {
            axios.post("http://localhost:8086/user", {
                name: this.name,
                email: this.email,
                password: this.password
            }).then((response) => {
                console.log(response)
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
