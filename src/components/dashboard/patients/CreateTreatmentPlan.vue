<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <h1>PLAN</h1>
        <form id="plan" @submit.prevent="sendForm" action="foo" method="post">
          <p><b>Жалобы</b></p>
          <p><textarea v-on:focus="focusHandler" name="жалобы"></textarea></p>
          <hr />
          <p><b>Болезнь</b></p>
          <p><textarea v-on:focus="focusHandler" name="болезнь"></textarea></p>
          <hr />
          <p><b>Диагноз</b></p>
          <p><textarea v-on:focus="focusHandler" name="диагноз"></textarea></p>
          <hr />
          <p><b>Лечение</b></p>
          <p><textarea v-on:focus="focusHandler" name="лечение"></textarea></p>
          <button type="text">Save</button>
        </form>
      </div>
      <div class="col-md-3">
        <ul class="fixed-item-list" v-on:dragstart="dragStartHandler">
          <li draggable="true" data-value="test-1">Text 1</li>
          <li draggable="true" data-value="test-2">Text 2</li>
          <li draggable="true" data-value="test-3">Text 3</li>
          <li draggable="true" data-value="test-4">Text 4</li>
          <li draggable="true" data-value="test-5">Text 5</li>
          <li draggable="true" data-value="test-6">Text 6</li>
          <li draggable="true" data-value="test-7">Text 7</li>
          <li draggable="true" data-value="test-8">Text 8</li>
          <li draggable="true" data-value="test-9">Text 9</li>
          <li draggable="true" data-value="test-10">Text 10</li>
          <li draggable="true" data-value="test-11">Text 11</li>
          <li draggable="true" data-value="test-12">Text 12</li>
          <li draggable="true" data-value="test-13">Text 13</li>
          <li draggable="true" data-value="test-14">Text 14</li>
          <li draggable="true" data-value="test-15">Text 15</li>
          <li draggable="true" data-value="test-16">Text 16</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.api";
import httpClient from "../../../../api/httpClient/httpClient";
export default {
  data() {
    return {};
  },
  methods: {
    sendForm(e) {
      console.log(e);
    },
    dragStartHandler(event) {
      const internalDNDType = "text/plain";
      event.dataTransfer.setData(internalDNDType, event.target.innerText + " ");
    },
    focusHandler(event) {
      let element = event.target;
      setTimeout(() => {
        element.selectionStart = element.selectionEnd;
      }, 1);
    }
  },
  mounted() {
    api(httpClient)
      .complaintTemplates.getList()
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }
};
</script>

<style lang="scss" scoped>
.fixed-item-list {
  position: fixed;
}
textarea {
  width: 100%;
  height: 300px;
}
.droop {
  height: 300px;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    cursor: pointer;
  }
}
</style>
