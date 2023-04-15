<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
});

const { FETCH_TODOS } = useApi();
const { $swal } = useNuxtApp();
const { useFadeUp } = useGsap();

const todosList = useState<any[]>('todosList', () => []);
async function getList (): Promise<void> {
  const { result, error } = await FETCH_TODOS.getTodos();

  if (error) { return; }

  todosList.value = result;
}
// await getList();
onMounted(() => {
  nextTick(async () => {
    await getList();
    useFadeUp();
  });
});

const newTodo = ref('');

async function addTodo (): Promise<void> {
  const todoTrim = newTodo.value.trim();

  if (!todoTrim) {
    $swal.fire({
      icon: 'warning',
      iconColor: '#000',
      html: '字串不可為空白',
      showConfirmButton: false,
      timer: 1500
    });
    return;
  }
  const todo = {
    title: todoTrim
  };
  const { result, error } = await FETCH_TODOS.addTodo(todo);

  if (error) { return; }

  todosList.value = result;

  newTodo.value = '';
}

function removeTodo (item: any): void {
  $swal.fire({
    icon: 'warning',
    iconColor: '#000',
    html: `確定要刪除 ${item.title} 嗎？`,
    confirmButtonText: '刪除',
    confirmButtonColor: '#000',
    showCancelButton: true,
    cancelButtonText: '取消',
    cancelButtonColor: '#c9c9c9'
  }).then(async (result: any) => {
    if (result.isConfirmed) {
      $swal.fire({
        icon: 'success',
        iconColor: '#000',
        html: `刪除 ${item.title} 成功`,
        timer: 1500,
        showConfirmButton: false
      });
      const { result, error } = await FETCH_TODOS.removeTodo(item._id);

      if (error) { return; }

      todosList.value = result;
    }
  });
}

// 更新
async function updateStatus (item: any) {
  item.isCompleted = !item.isCompleted;

  const { result, error } = await FETCH_TODOS.updateTodo(item);

  if (error) { return; }

  todosList.value = result;
}

const editingId = ref<string>('');
const editCache = ref<string>('');

// 更新Ｔodo
async function updateTodo (todoItem: any) {
  const editCacheTrim = editCache.value.trim();

  if (!editCacheTrim) {
    $swal.fire({
      icon: 'warning',
      iconColor: '#000',
      showConfirmButton: false,
      timer: 1500,
      html: '字串不能為空'
    });
    return;
  }

  const todo = {
    _id: todoItem._id,
    title: editCache.value,
    isCompleted: todoItem.isCompleted
  };
  const { result, error } = await FETCH_TODOS.updateTodo(todo);

  editingId.value = '';
  editCache.value = '';

  if (error) { return; }

  todosList.value = result;
}
</script>
<template>
  <section class="w-full md:max-w-40% mx-auto h-[calc(100vh-116px)]">
    <ul class="fadeUp border-4px border-black rounded-10px w-full max-h-full overflow-y-auto shadow-[4px_4px_0px_4px_black]">
      <div class="sticky top-0 left-0 bg-white w-full h-90px p-20px z-99">
        <div class="flex items-center w-full border-4px h-50px border-black rounded-10px overflow-hidden">
          <input v-model="newTodo" type="text" class="focus:outline-none px-20px w-full" @keyup.enter="addTodo">
          <button class="w-60px h-full flex items-center justify-center bg-yellow-300 border-l-4px border-l-black" @click="addTodo">
            <fa icon="far fa-plus" />
          </button>
        </div>
      </div>
      <li>
        <ul class="flex flex-col gap-y-20px mb-20px px-20px">
          <li v-for="(todo, idx) in todosList" :key="todo.id" class="border-4px border-black rounded-10px py-10px px-20px relative overflow-hidden">
            <div class="flex items-center gap-x-10px">
              <button class="w-20px h-20px rounded-full flex items-center justify-center relative border-2px border-black overflow-hidden" @click="updateStatus(todo)">
                <div class="absolute w-full h-full flex items-center justify-center text-sm bg-yellow-300 duration-300 rounded-full" :class="[todo.isCompleted ? 'scale-100' : 'scale-0']">
                  <fa icon="far fa-check" />
                </div>
              </button>
              <span v-if="editingId !== todo._id">{{ idx + 1 }}.</span>
              <p v-if="editingId !== todo._id" class="line-clamp-1" :class="[todo.isCompleted ? 'line-through' : '']" @dblclick="editingId = todo._id, editCache = todo.title">
                {{ todo.title }}
              </p>
              <input
                v-else
                v-model="editCache"
                type="text"
                class="focus:outline-4px focus:outline-black w-[calc(100%-100px)]"
                @keyup.enter="updateTodo(todo)"
                @keyup.esc="editingId = '', editCache = ''"
              >
            </div>
            <button v-if="editingId !== todo._id" class="absolute top-0 right-0 w-40px h-full flex items-center justify-center" @click="removeTodo(todo)">
              <fa icon="far fa-trash" class="text-20px" />
            </button>
            <button v-if="editingId === todo._id" class="absolute top-0 right-40px w-40px h-full flex items-center justify-center bg-pink-300" @click="editingId = '', editCache = ''">
              <fa icon="far fa-xmark" class="text-20px" />
            </button>
            <button v-if="editingId === todo._id" class="absolute top-0 right-0 w-40px h-full flex items-center justify-center bg-green-300" @click="updateTodo(todo)">
              <fa icon="far fa-check" class="text-20px" />
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
