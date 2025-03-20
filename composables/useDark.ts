import { createSharedComposable, useLocalStorage } from "@vueuse/core";

export const useDarkTheme = createSharedComposable(() => {
  const isDark = useLocalStorage<boolean>(
    "dark-theme",
    document === undefined
      ? true // if rendering on server
      : // get the one that loaded first as the default??
      document.getElementsByTagName("html")[0].classList.contains("dark")
      ? true
      : false,
    {
      initOnMounted: true,
    }
  );

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
