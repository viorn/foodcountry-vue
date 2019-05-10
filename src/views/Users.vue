<template>
  <div>
    <div class="box" id="usersTable">
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous" v-bind:disabled="page==1" v-on:click="previousPage()">Назад</a>
        <a class="pagination-next" v-bind:disabled="page==totalPage" v-on:click="nextPage()">Вперед</a>
        <ul class="pagination-list">
          <li><a class="pagination-link" v-if="paginationFirstPage" v-on:click="changePage(1)">1</a></li>
          <li><span class="pagination-ellipsis" v-if="paginationFirstPage">&hellip;</span></li>
          <li v-for="page in paginationPages"><a class="pagination-link" v-on:click="changePage(page.page)" v-bind:class="{'is-current': page.active}" aria-current="page">{{page.page}}</a></li>
          <li><span class="pagination-ellipsis" v-if="paginationLastPage">&hellip;</span></li>
          <li><a class="pagination-link" v-if="paginationLastPage" v-on:click="changePage(totalPage)">{{totalPage}}</a></li>
        </ul>
      </nav>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>id</th>
            <th>Имя</th>
            <th>Роль</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-item" :class="{'is-selected': isSelectItem(user)}" style="cursor: pointer;" v-for="user in users" @click="setSelectItem(user)">
            <td style="width: 100px;">{{user.id}}</td>
            <td>{{user.name}}</td>
            <td style="width: 300px;">{{user.roles.join(', ')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as rest from '@/modules/Rest.js';
export default {
  data() {
    return {
      users: [],
      page: 1,
      totalPage: 1,
      paginationFirstPage: false,
      paginationLastPage: false,
      paginationPages: [],
      selectItem: null
    }
  },
  methods: {
    isSelectItem(user){
      return false
    },
    setSelectItem(user){

    }
  },
  created() {
    let vm = this
    rest.getUsers(vm.page, 10).then((req)=>{
      vm.users = req.data.list
    })
  }
}
</script>

<style>
#usersTable {
    margin-top: 16px;
    margin-left: 16px;
    margin-right: 16px;
}
</style>
