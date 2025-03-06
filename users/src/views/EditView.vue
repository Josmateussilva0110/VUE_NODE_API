<template>
    <div>
        <h3>Edição de Usuário</h3>
        <div v-if="error != undefined">
            <p>{{ error }}</p>
        </div>
        <input type="text" placeholder="Username" v-model="name" /><br>
        <input type="email" placeholder="Email" v-model="email"/><br>
        <button @click="update">Editar</button>
    </div>
</template> 

<script>

import axios from 'axios';

export default {
    created() {

        const req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
        }

        axios.get("http://localhost:8086/user/"+ this.$route.params.id, req)
            .then((response) => {
                this.name = response.data.name
                this.email = response.data.email
                this.id = response.data.id
            }).catch((error) => {
                console.log(error.response)
                this.$router.push({name: 'users'})
            })
    },

    data() {
        return {
            id: '',
            name: '',
            email: '',
            error: undefined
        }
    },

    methods: {
        update() {
            const req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.put("http://localhost:8086/user",{
                id: this.id,
                name: this.name,
                email: this.email
            }, req ).then((response) => {
                console.log(response)
                this.$router.push({name: 'users'})
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
