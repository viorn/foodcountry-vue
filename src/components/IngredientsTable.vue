<template>
<div class="box">
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
        <th class="is-hidden-mobile">id</th>
        <th>Имя</th>
        <th>Ккал</th>
        <th class="is-hidden-mobile">Белки</th>
        <th class="is-hidden-mobile">Жиры</th>
        <th class="is-hidden-mobile">Углеводы</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ingredient in ingredients">
        <td class="is-hidden-mobile" style="width: 100px;">{{ingredient.id}}</td>
        <td class="is-hidden-mobile">{{ingredient.name}}</td>
        <td class="is-hidden-tablet"><a>{{ingredient.name}}</a></td>
        <td style="width: 100px;">{{ingredient.calorie}}</td>
        <td class="is-hidden-mobile" style="width: 100px;">{{ingredient.squirrels}}</td>
        <td class="is-hidden-mobile" style="width: 100px;">{{ingredient.fats}}</td>
        <td class="is-hidden-mobile" style="width: 100px;">{{ingredient.carbohydrates}}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import * as rest from '@/modules/Rest.js';
import {
  EventBus
} from '@/main.js';
export default {
  name: 'IngredientsTable',
  data() {
    return {
      ingredients: [],
      page: 1,
      totalPage: 1,
      paginationFirstPage: false,
      paginationLastPage: false,
      paginationPages: []
    }
  },
  methods: {
    updatePaginationTabs: function(page, totalPage) {
      this.totalPage = totalPage;
      if (totalPage <= 10) {
        var result = [];
        for (var i = 1; i < totalPage + 1; i++) {
          result.push({
            page: i,
            active: page == i
          });
        }
        this.paginationPages = result;
        this.paginationFirstPage = false;
        this.paginationLastPage = false;
      } else if (page <= 4) {
        var result = [];
        for (var i = 1; i < 6; i++) {
          result.push({
            page: i,
            active: page == i
          });
        }
        this.paginationPages = result;
        this.paginationFirstPage = false;
        this.paginationLastPage = true;
      } else if (page >= totalPage - 4) {
        var result = [];
        for (var i = totalPage - 5; i < totalPage + 1; i++) {
          result.push({
            page: i,
            active: page == i
          });
        }
        this.paginationPages = result;
        this.paginationFirstPage = true;
        this.paginationLastPage = false;
      } else {
        this.paginationPages = [{
            page: page - 1,
            active: false
          },
          {
            page: page,
            active: true
          },
          {
            page: page + 1,
            active: false
          }
        ];
        this.paginationFirstPage = true;
        this.paginationLastPage = true;
      }
    },
    changePage: function(page) {
      let limit = 10;
      rest.loadIngredients(page, limit)
        .catch(err => {
          if (err.response.status == 401) {
            this.$router.push("/login")
          }
        }).then(res => {
          this.page = page;
          this.ingredients = res.data.list;
          this.updatePaginationTabs(page, Math.ceil(res.data.total / limit));
        });
    },
    nextPage: function() {
      if (this.page != this.totalPage) {
        this.changePage(this.page + 1);
      }
    },
    previousPage: function() {
      if (this.page != 1) {
        this.changePage(this.page - 1);
      }
    }
  },
  created() {
    this.changePage(1);
    EventBus.$on('update_ingredients_list', () => {
      this.changePage(this.page);
    });
}
}
</script>
