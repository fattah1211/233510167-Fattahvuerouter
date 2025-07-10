import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const keyword = ref('');

  const setKeyword = (newKeyword) => {
    keyword.value = newKeyword;
  };

  return { keyword, setKeyword };
});
