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
                            <router-link :to="{name: 'editUser', params: {id: user.id}}"><button class="edit">Editar</button></router-link>
                            <button class="delete" @click="confirmDelete(user.id)">Excluir</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="showConfirm" class="modal">
            <div class="modal-content">
                <p>Deseja realmente excluir este usuário?</p>
                <button @click="deleteUser">Sim</button>
                <button @click="showConfirm = false">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: [],
            showConfirm: false,
            userIdToDelete: null
        }
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

        confirmDelete(userId) {
            this.userIdToDelete = userId;
            this.showConfirm = true;
        },

        deleteUser() {
            const req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }


            axios.delete('http://localhost:8086/user/'+this.userIdToDelete, req).then(response => {
                console.log(response)
                this.showConfirm = false
                this.users = this.users.filter(user => user.id !== this.userIdToDelete)

            }).catch(error => {
                console.error("Erro ao excluir usuário:", error);
            });
        }
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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

.modal-content button {
    margin: 10px;
}

</style>
