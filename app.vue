<script lang="ts" setup>
import { FETCH_ROOM } from './api/room';

const roomList = ref([]) as any;
async function getList(): Promise<void> {
  const query = {
    pageNo: 1,
    pageSize: 12,
  };
  const { result } = await FETCH_ROOM.getRoomList(query);

  roomList.value = result.orders.data;
  console.log(result.orders.data)
}

await getList();
// onMounted(async () => {
//   await getList();
// })
</script>
<template>
  <section>
    <ul>
      <li v-for="item in roomList" :key="item.id">
        <h2>{{ item.title }}</h2>
      </li>
    </ul>
  </section>
</template>
