import { useLocalStorage } from "@vueuse/core";

export const useDarkTheme = () => {
  const isDark = useLocalStorage<boolean>("theme", true);

  onMounted(() => {
    if (isDark.value) {
      const html = document.getElementsByTagName("html")[0];
      html.classList.add("dark");
    } else {
      const html = document.getElementsByTagName("html")[0];
      html.classList.remove("dark");
    }
  });

  const setDarkMode = (value: boolean) => {
    const html = document.getElementsByTagName("html")[0];
    if (value) html.classList.add("dark");
    else html.classList.remove("dark");

    isDark.value = html.classList.contains("dark");
  };

  return { isDark, setDarkMode };
};
