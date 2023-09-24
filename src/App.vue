<template>
  <div>
    <h1>Login</h1>

    <form>
      <div>
        <label for="user">Usuário:</label>
        <input v-model="register.user" type="text" name="user" placeholder="Usuário" id="user">
      </div>
      <div>
        <label for="password">Senha:</label>
        <input v-model="register.password" type="password" name="password" placeholder="Senha"  id="password">
      </div>
      <div>
        <button class="btn" type="button" @click="doLogin" value="Login">Login</button>
      </div>
    </form>

    Token <strong>Exibição didática</strong>: {{ token ? token : 'As transações não serão autorizadas, faça login ou registre-se' }}

    <div v-if="token">
      <h1>Logout</h1>
      <button @click="doLogout" class="btn" type="button">Logout</button>
    </div>
    

    <h1>Register</h1>

    <form >
      <div>
        <label for="user">User Name:</label>
        <input type="text" v-model="register.user" name="user" placeholder="nock sem espaço" id="name">
      </div>
      <div>
        <label for="email">E-mail:</label>
        <input type="text" v-model="register.email" name="email" placeholder="email" id="email">
      </div>
      <div>
        <label for="password">Senha:</label>
        <input type="password" v-model="register.password" name="password" placeholder="senha" id="password">
      </div>
      <div>
        <button class="btn" type="button" @click="doRegister" value="Login">Registrar</button>
      </div>
    </form>

    <h1>Clientes</h1>
    {{ action }}
    <div>
      <button @click="clearForm" class="btn">Criar Novo +</button>
    </div>
    
    <div>
      <button @click="findClients" class="btn">Atualizar Lista</button>
    </div>

    <table v-if="action == 'list'">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>CPF</th>
          <th>Cep</th>
          <th>Address</th>
          <th>created_at</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.id }}</td>
          <td>{{ client.name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.phone }}</td>
          <td>{{ client.cpf }}</td>
          <td>{{ client.cep }}</td>
          <td>{{ client.address }}</td>
          <td>{{ client.created_at }}</td>
          <td>
            <button class="btn" @click="showClient(client.id)" type="button">Editar</button>
            <button class="btn" @click="deleteClient(client.id)" type="button">Excluir</button>
          </td>
        </tr>
      </tbody>
      
      
      
    </table>

    <div v-if="action == 'create' || action == 'update'">
        <form>
          <div>
            <label for="name">Name:</label>
            <input v-model="client.name" type="text" name="name" placeholder="Nome" id="name">
          </div>
          <div>
            <label for="email">E-mail:</label>
            <input v-model="client.email" type="text" name="email" placeholder="email" id="email">
          </div>
          <div>
            <label for="phone">Phone:</label>
            <input v-model="client.phone" type="text" name="phone" placeholder="phone" id="phone">
          </div>
          <div>
            <label for="cpf">CPF:</label>
            <input v-model="client.cpf" type="text" name="cpf" placeholder="cpf" id="cpf">
          </div>
          <div>
            <label for="cep">CEP:</label>
            <input v-model="client.cep" type="text" name="cep" placeholder="cep" id="cep">
          </div>
          <div>
            <label for="address">Address:</label>
            <input v-model="client.address" type="text" name="address" placeholder="address" id="address">
          </div>
          <div>
            <button v-if="action == 'create'" @click="creatClient" class="btn" type="button">Criar</button>
            <button v-if="action == 'update'" @click="updateClient(client.id)" class="btn" type="button">Atualizar</button>
          </div>
        </form>
      </div>
    <div v-if="clients.length <= 0">
        <p>Nenhum cliente cadastrado ou sem autorização para ver o recurso</p>
      </div>

  </div>
</template>
<script>

import UserAPI from './api/user';
import ClientsAPI from './api/clients';

export default {
  name: 'App',
  components: {
  },

  data(){
    return{
      action: 'list',
      register:{
        user: '',
        email: '',
        password: ''
      },
      client: {
        name: '',
        email: '',
        phone: '',
        cpf: '',
        cep: '',
        address: ''
      },
      token: '',
      clients: []
    }
  },

  mounted() {
    this.token = localStorage.getItem("_token");

    if(this.token){
      ClientsAPI.list()
        .then((response) => {
          this.clients = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  methods: {
    doLogin() {
      //const user = document.getElementById('user').value;
      //const password = document.getElementById('password').value;
      let self = this;
      UserAPI.login(this.register.user, this.register.password)
        .then((response) => {
          localStorage.setItem("_token", response.data.token);
          self.token = response.data.token;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    doRegister(){

      UserAPI.register(this.register.user, this.register.email, this.register.password)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    doLogout(){
      console.log('logout');
      localStorage.removeItem("_token");
      this.token = '';
    },

    findClients(){
      this.action = "list";
      ClientsAPI.list()
        .then((response) => {
          this.clients = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    creatClient(){
      let self = this
      ClientsAPI.create(this.client.name, this.client.email, this.client.phone, this.client.cpf, this.client.cep, this.client.address)
        .then((response) => {
          if(response.status == 200){
            self.action = "list";
            self.findClients();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteClient(id){
      let self = this
      ClientsAPI.delete(id)
        .then((response) => {
          if(response.status == 200){
            self.action = "list";
            self.findClients();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showClient(id){
      let self = this
      self.action = "update";
      ClientsAPI.show(id)
        .then((response) => {
          if(response.status == 200){
            
            self.client = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateClient(id){
      let self = this
      ClientsAPI.update(id, this.client.name, this.client.email, this.client.phone, this.client.cpf, this.client.cep, this.client.address)
        .then((response) => {
          if(response.status == 200){
            self.action = "list";
            self.findClients();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clearForm(){
      this.action = 'create';
      this.client = {
        name: '',
        email: '',
        phone: '',
        cpf: '',
        cep: '',
        address: ''
      }
    }
  },
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

body {
  font-family: 'Montserrat', sans-serif !important;
}

.btn{
  background-color: white;
  color: black!important;

}
h1{
  margin-top: 50px;
}

input{
  border: solid 1px white!important;
}
</style>
