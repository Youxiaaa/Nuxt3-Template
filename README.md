# Nuxt3 開發模板

## Setup
```javascript
// 安裝依賴
npm i

// 啟動
npm run dev

// 打包
npm run build
```

## 環境版本
```javascript
Node => 16.19.0
Npm => 9.2.0
```

## 相關依賴
```javascript
- Pinia
- UnoCSS
- Font-Awesome
- sweetalert2
```

## API 使用方式
```javascript
<script lang="ts" setup>
  const { FETCH_ROOM } = useApi();

  cosnt roomList = ref([]);
  async function getRoomList() {
    const query = {
      pageNo: 1,
      pageSize: 20
    }
    const { result } = await FETCH_ROOM(query)

    roomList.value = result.orders.data;
  }
  // 執行 Function
  await getRoomList();
</script>
```
## Store 使用方式
```javascript
const { AuthStore } = useStore();

if (!AuthStore().TOKEN_GETTER) {
  if (to.path !== '/login') return navigateTo('/login');
};
else {
  if (to.path === '/login') return navigateTo('/');
};
```
