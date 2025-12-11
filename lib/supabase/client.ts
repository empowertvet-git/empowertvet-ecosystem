// Supabase client setup for browser
export function createBrowserClient() {
  // For now, return mock client until Supabase is connected
  return {
    auth: {
      signUp: async (credentials: { email: string; password: string; options?: any }) => {
        console.log('[v0] Mock signUp:', credentials.email)
        return { data: { user: null }, error: null }
      },
      signInWithPassword: async (credentials: { email: string; password: string }) => {
        console.log('[v0] Mock signIn:', credentials.email)
        // Mock successful login
        const mockUser = {
          id: 'mock-user-id',
          email: credentials.email,
          user_metadata: { full_name: 'Test User' }
        }
        return { data: { user: mockUser, session: { access_token: 'mock-token' } }, error: null }
      },
      signOut: async () => {
        console.log('[v0] Mock signOut')
        return { error: null }
      },
      getSession: async () => {
        return { data: { session: null }, error: null }
      },
      onAuthStateChange: (callback: Function) => {
        return { data: { subscription: { unsubscribe: () => {} } } }
      }
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
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          then: async (fn: Function) => fn({ data: null, error: null })
        })
      })
    })
  }
}
