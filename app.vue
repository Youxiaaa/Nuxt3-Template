<script lang="ts" setup>
const { FETCH_ROOM } = useApi()

const roomList = ref([]) as any;
async function getList(): Promise<void> {
  const query = {
    pageNo: 1,
    pageSize: 1,
  };
  const { result } = await FETCH_ROOM.getRoomList(query);

  roomList.value = result.orders.data;
}

await getList()
</script>
<template>
  <section class="p-20px">
    <ul class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10px xl:gap-20px">
      <li v-for="item in roomList" :key="item.id"
        class="col-span-1 min-h-150px w-full rounded-10px border-4px border-black flex flex-col gap-10px items-center justify-center p-20px">
        <img :src="item.pictureUrl" :alt="item.title">
        <h2 class="fw-800 text-20px">{{ item.title }}</h2>
      </li>
    </ul>
    <button @click="getList" class="border-4px border-black p-20px rounded-10px text-center mt-40px flex-center">Abort
      API</button>
  </section>
</template>
