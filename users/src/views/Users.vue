<template>
    <div>
        <h1>Painel Adm</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Função</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ processRole(user.role) }}</td>
                    <td>
                        <div>
                            <button class="edit" @click="editUser(user)">Editar</button>
                            <button class="delete" @click="deleteUser(user.id)">Excluir</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: []
        };
    },
    created() {
        const req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        };
        axios.get('http://localhost:8086/users', req)
            .then(response => {
                this.users = response.data;
            })
            .catch(error => {
                console.error("Erro ao buscar usuários:", error);
            });
    },

    methods: {
        processRole: function(role) {
            if (role == 1) {
                return "Admin";
            } else {
                return "Usuário";
            }
        },
    }
};
</script>

<style scoped>
table {
    width: 80%;
    border-collapse: collapse;
    margin-top: 1rem;
    margin: 0 auto;
}

th, td {
    border: 1px solid #bdbaba;
    padding: 0.5rem;
    text-align: left;
}

th {
    background-color: #b9b8b8;
    font-weight: bold;
}

td:last-child {
    text-align: center;
}

td:last-child div {
    display: flex;
    justify-content: center;
    gap: 5px;
}

button {
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

button.edit {
    background-color: #4CAF50;
    color: white;
}

button.delete {
    background-color: #f44336;
    color: white;
}
</style>
