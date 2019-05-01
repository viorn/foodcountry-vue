<template>
<div class="modal" :class="{ 'is-active': isShow }">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{title}}</p>
      <button class="delete" aria-label="close" @click="clickToCancel()"></button>
    </header>
    <section class="modal-card-body">
      {{message}}
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="clickToSuccess()">Да</button>
      <button class="button" @click="clickToCancel()">Отмена</button>
    </footer>
  </div>
</div>
</template>

<script>
export default {
  name: "SimpleDialog",
  data() {
    return {
      isShow: false,
      title: 'Заголовок',
      message: 'Сообщение'
    }
  },
  methods: {
    callback: function() {},
    show(params) {
      this.title = params.title
      this.message = params.message
      this.callback = params.callback
      this.isShow = true
    },
    clickToCancel() {
      this.isShow = false
    },
    clickToSuccess() {
      this.callback()
      this.isShow = false
    }
  }
}
</script>
