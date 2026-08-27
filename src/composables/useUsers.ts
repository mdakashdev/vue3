import { useQuery } from '@tanstack/vue-query'
import { getUsers } from '@/api/userApi.ts'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
}
