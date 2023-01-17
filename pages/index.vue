<script lang="ts" setup>
import { QueryFormType } from '~~/types';
const { FETCH_ROOM } = useApi();

const roomList = useState<any[]>('roomList', () => []);
const query = ref<QueryFormType>({
  pageNo: 1,
  pageSize: 15
});
async function getList (): Promise<void> {
  const { result, error } = await FETCH_ROOM.getRoomList(query.value, false);
  if (error) { return; }
  roomList.value = result.orders.data;
}

// onMounted(() => {
//   nextTick(() => {
//     getList();
//   });
// });
await getList();
</script>
<template>
  <section>
    <!-- <RecycleScroller
      class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10px xl:gap-20px"
      :items="roomList"
      :item-size="50"
    >
      <template v-slot="{ item }">
        <div class="col-span-1 min-h-150px w-full rounded-10px border-4px border-black flex flex-col gap-10px items-center justify-center p-20px shadow-[6px_6px_0px_black]">
          <img v-lazy="item.pictureUrl" :alt="item.title">
          {{ item.title }}
        </div>
      </template>
    </RecycleScroller> -->
    <ul v-if="roomList.length > 0" class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10px xl:gap-20px">
      <li
        v-for="item in roomList"
        :key="item.id"
        class="col-span-1 min-h-150px w-full rounded-10px border-4px border-black flex flex-col gap-10px items-center justify-center p-20px shadow-[6px_6px_0px_black]"
      >
        <img v-lazy="item.pictureUrl" :alt="item.title">
        <h2 class="fw-800 text-20px">
          {{ item.title }}
        </h2>
      </li>
    </ul>
    <p v-else class="text-center fw-800 text-24px">
      暫無資料
    </p>
    <div class="flex items-center gap-20px mt-20px">
      <button class="border-4px border-black p-20px rounded-10px text-center" @click="getList">
        Abort API
      </button>
      <nuxt-link to="/detail/123" class="border-4px border-black p-20px rounded-10px text-center inline-block">
        TO DETAIL PAGE
      </nuxt-link>
    </div>
  </section>
</template>
