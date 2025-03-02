<template>
  <section>
    <div>
      <h2>Todos</h2>
      <input
        type="text"
        v-model="todoName"
        @keyup.enter="addTodo"
        aria-label="Add a new Todo"
        placeholder="Add a new Todo"
      />
      <div class="d-gridx">
        <button class="btn btn-primary" @click="addTodo()" type="submit">
          Add Todo
        </button>
      </div>
      <br />
      <div>
        <ul>
          <li
            class="nav-item px-2"
            v-for="todo of todos"
            :class="{ done: todo.done }"
            :key="todo.id"
            @click="doneTodo(todo.id)"
          >
            {{ todo.name }}
          </li>
        </ul>
      </div>
    </div>
    <div id="clientGrid">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">E-mail</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <th scope="row">{{ client.id }}</th>
            <td>{{ client.firstName }}</td>
            <td>{{ client.lastName }}</td>
            <td>{{ client.email }}</td>
            <td>
              <ul class="actions">
                <li>
                  <router-link
                    class="nav-link"
                    :to="'/client/' + client.id + '/profile'"
                    ><i class="fas fa-eye"></i
                  ></router-link>
                </li>
                <li>
                  <router-link class="nav-link" :to="'/client/' + client.id"
                    ><i class="fas fa-user-edit"></i
                  ></router-link>
                </li>
                <li>
                  <a
                    @click="destroy(client)"
                    class="nav-link"
                    v-if="!client.deleted_at"
                    ><i class="fas fa-user-times"></i
                  ></a>
                  <a
                    @click="update(client)"
                    class="nav-link"
                    v-if="client.deleted_at"
                    ><i class="fas fa-user-check"></i
                  ></a>
                </li>
              </ul>
            </td>
          </tr>
          <tr v-if="loading">
            <td colspan="5"><img src="images/preloader.gif" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import axios from "axios";

const baseURL = "http://localhost:3000/todos";

export default {
  // Article Reference: https://developer.school/how-to-use-vue-js-json-server-and-axios
  // Multimple Entities: https://billyyyyy3320.com/en/2019/07/21/create-json-server-with-multiple-files/

  name: "TodoList",
  data() {
    return {
      todos: [],
      todoName: "",
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);
      console.log(res.data);
      this.todos = res.data;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async doneTodo(id) {
      try {
        await axios.patch(`${baseURL}/${id}`, {
          done: true,
        });

        this.todos = this.todos.map((todo) => {
          if (todo.id === id) {
            todo.done = true;
          }

          return todo;
        });
      } catch (e) {
        console.error(e);
      }
    },
    async addTodo() {
      try {
        const res = await axios.post(baseURL, { name: this.todoName });

        this.todos = [...this.todos, res.data];

        this.todoName = "";
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-decoration: underline;
}

li {
  color: black;
  list-style-type: square;
}

input {
  width: 100%;
  padding: 1rem;
  border-radius: 0.4rem;
  border: 1px solid #fd9644;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.done {
  text-decoration: line-through;
}
</style>
