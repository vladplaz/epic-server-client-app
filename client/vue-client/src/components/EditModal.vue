<template>
  <div id="modal" class="modal" ref="modal">
    <div class="modal-content">
      <div class="input-field">
        <input type="text" value={text}
               v-model="text"
               @keydown="keyHandler"
               ref="input"/>
      </div>
    </div>
    <div class="modal-footer">
      <button
          @click="onFinishCancel"
          class="btn waves-effect waves-green btn-flat">
        Cancel
      </button>
      <button
          @click="onFinishConfirm"
          class="btn waves-effect waves-green btn-flat">
        Ok
      </button>
    </div>
  </div>
</template>

<script>

import MaterializeService from '@/shared/classes/MaterializeService'

export default {
  name: 'EditModal',
  props: ['todoText'],
  data: () => ({
    text: '',
    modal: null
  }),
  methods: {
    onFinishCancel() {
      this.$emit('editFinish',
          {status: 'cancel'})
      this.modal.close()
    },
    onFinishConfirm() {
      if(this.text.trim()) {
        this.$emit('editFinish',
            {status: 'ok', text: this.text})
        this.modal.close()
      }
    },
    keyHandler(e) {
      if(e.key === 'Enter') {
        this.onFinishConfirm()
      }
    }
  },
  mounted() {
    this.modal = MaterializeService.initModal(this.$refs.modal)
    this.modal.open()
    this.$refs.input.focus()
    this.text = this.todoText
  }
}
</script>

<style scoped>
.modal {
  height: 14rem !important;
  overflow: hidden;
  max-height: 500%;
  z-index: 2000;
  width: 28rem;
}

.modal .modal-content {
  padding-bottom: 0 !important;
}

.modal input {

}

.modal button {
  margin-right: 1.2rem !important;
  color: white;
  border-radius: 5px;
  background-color: #5f0e90;
}
</style>
