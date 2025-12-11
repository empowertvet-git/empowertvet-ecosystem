import { cookies } from 'next/headers'

export async function createServerClient() {
  // Mock server client until Supabase is connected
  return createMockClient()
}

function createMockClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null })
    },
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          single: async () => ({ data: null, error: null }),
          then: async (fn: Function) => fn({ data: [], error: null })
        }),
        order: (column: string, options?: any) => ({
          then: async (fn: Function) => fn({ data: [], error: null })
        }),
        then: async (fn: Function) => fn({ data: [], error: null })
      }),
      insert: (values: any) => ({
        select: () => ({
          single: async () => ({ data: null, error: null })
        }),
        then: async (fn: Function) => fn({ data: null, error: null })
      }),
      update: (values: any) => ({
        eq: (column: string, value: any) => ({
          then: async (fn: Function) => fn({ data: null, error: null })
        })
      })
    })
  }
}
