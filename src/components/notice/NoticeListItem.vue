<script setup>
defineProps({ article: Object });
</script>

<template>
  <tr v-if="article.userId === 'admin'" class="text-start">
    <td scope="">{{ article.boardId }}</td>
    <td class="text-start">
      <router-link
        :to="{ name: 'notice-detail', params: { boardId: article.boardId } }"
        class="article-title link-dark"
      >
        {{ article.title }}
      </router-link>
    </td>
    <td>{{ article.userId }}</td>
    <td>{{ article.viewCount }}</td>
    <td>{{ article.createTime }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
