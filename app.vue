<script lang="ts" setup>
import { FETCH_ROOM } from './api/room';

const roomList = ref([]) as any;
async function getList(): Promise<void> {
  const query = {
    pageNo: 1,
    pageSize: 12,
  }
  const res = await FETCH_ROOM.getRoomList(query);

  roomList.value = res.value.result.orders.data;
}

getList();
</script>
<template>
  <section>
    <ul>
      <li v-for="item in roomList" :key="item.id">
        <img :src="item.pictureUrl" :alt="item.title">
        <h2>{{ item.title }}</h2>
      </li>
    </ul>
  </section>
</template>
