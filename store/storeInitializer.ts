import { useAuthStore } from './authStore'
import { useLikeStore } from './likeStore'
import { likeService } from '@/services/likeService'

export function initializeStores() {
  useAuthStore.subscribe(
    (state) => {
      const {token, isAuthenticated } = state;

      if (isAuthenticated) {
        likeService.fetchLikes(token as string).then((likes) => {
          useLikeStore.getState().setLikes(likes);
        });
      } else {
        useLikeStore.getState().clearLikes();
      }
    },
  );
}