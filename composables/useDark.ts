import { createSharedComposable, useLocalStorage } from "@vueuse/core";

export const useDarkTheme = createSharedComposable(() => {
  const isDark = useLocalStorage<boolean>("dark-theme", true, {
    initOnMounted: true,
  });

  const setDarkMode = (value: boolean) => {
    isDark.value = value;
  };

  watch(
    isDark,
    (value) => {
      if (document === undefined) return;
      const html = document.getElementsByTagName("html")[0];
      if (value) {
        html.classList.add("dark");
        html.classList.remove("light");
      } else {
        html.classList.remove("dark");
        html.classList.add("light");
      }
    },
    { immediate: true }
  );

  return { isDark, setDarkMode };
});
