const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LikeObject {
  _id: string;
  userId: string;
  movieId: string;
}

export const likeService = {
  async fetchLikes(token: string): Promise<number[]> {
    const response = await fetch(`${API_URL}/likes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch likes')
    }
    const likes: LikeObject[] = await response.json()
    return likes.map(like => parseInt(like.movieId, 10))
  },

  async addLike(movieId: number, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/likes/${movieId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      if (response.status === 409) {
        console.warn('Movie already liked')
        return
      }
      throw new Error('Failed to add like')
    }
  },

  async removeLike(movieId: number, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/likes/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) {
      if (response.status === 409) {
        console.warn('Movie already unliked')
        return
      }
      throw new Error('Failed to remove like')
    }
  }
}

