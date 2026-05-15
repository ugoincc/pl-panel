import { QueryClient } from '@tanstack/react-query'
import '../../api/api'

export function getContext() {
  const queryClient = new QueryClient()

  return {
    queryClient,
  }
}
export default function TanstackQueryProvider() {}
