import { useRouter } from "vue-router";

export default function useGoToRoute() {
  const router = useRouter();

  const goToRoute = (name) => router.push({ name });

  return {
    goToRoute,
  };
}
