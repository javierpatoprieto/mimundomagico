'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Users, BookOpen, Star, TrendingUp, RefreshCw, LogOut } from 'lucide-react'

const ADMIN_EMAILS = ['legal@mimundomagico.es', 'javierpatoprieto@gmail.com']

interface Stats {
  totalUsers: number
  premiumUsers: number
  totalStories: number
  aiStoriesGenerated: number
  newUsersToday: number
  newUsersWeek: number
}

interface RecentUser {
  id: string
  email: string
  created_at: string
  is_premium: boolean
  ai_trial_used: boolean
}

interface RecentStory {
  id: string
  title: string
  theme: string
  cover_emoji: string
  created_at: string
  is_ai_generated: boolean
}

export default function AdminPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([])
  const [recentStories, setRecentStories] = useState<RecentStory[]>([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const email = data.user?.email ?? ''
      if (!ADMIN_EMAILS.includes(email)) {
        router.replace('/')
        return
      }
      setAuthorized(true)
      loadData()
    })
  }, [])

  const loadData = async () => {
    setRefreshing(true)
    try {
      // Users stats
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, is_premium, ai_trial_used, created_at')

      const now = new Date()
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

      const total = profiles?.length ?? 0
      const premium = profiles?.filter(p => p.is_premium).length ?? 0
      const today = profiles?.filter(p => p.created_at >= todayStart).length ?? 0
      const week = profiles?.filter(p => p.created_at >= weekStart).length ?? 0

      // Stories stats
      const { data: stories } = await supabase
        .from('stories')
        .select('id, title, theme, cover_emoji, created_at, is_ai_generated')
        .order('created_at', { ascending: false })
        .limit(50)

      const aiCount = stories?.filter(s => s.is_ai_generated).length ?? 0

      setStats({
        totalUsers: total,
        premiumUsers: premium,
        totalStories: stories?.length ?? 0,
        aiStoriesGenerated: aiCount,
        newUsersToday: today,
        newUsersWeek: week,
      })

      // Recent users (join with auth not possible from client, use profiles)
      const { data: recentProfiles } = await supabase
        .from('profiles')
        .select('id, is_premium, ai_trial_used, created_at')
        .order('created_at', { ascending: false })
        .limit(10)

      setRecentUsers((recentProfiles ?? []).map(p => ({
        id: p.id,
        email: p.id.slice(0, 8) + '...',
        created_at: p.created_at,
        is_premium: p.is_premium,
        ai_trial_used: p.ai_trial_used,
      })))

      setRecentStories((stories ?? []).slice(0, 10) as RecentStory[])
    } catch (e) {
      console.error(e)
    } finally {
      setRefreshing(false)
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-5xl mb-4 animate-spin">⚙️</div>
          <p className="font-black text-lg">Cargando panel...</p>
        </div>
      </div>
    )
  }

  if (!authorized) return null

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌟</span>
          <div>
            <h1 className="font-black text-lg">Mi Mundo Mágico</h1>
            <p className="text-white/40 text-xs font-bold">Panel de Administrador</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-colors"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            Actualizar
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-bold transition-colors"
          >
            <LogOut size={14} />
            Salir
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard icon={<Users size={20} />} label="Usuarios totales" value={stats?.totalUsers ?? 0} color="violet" />
          <StatCard icon={<Star size={20} />} label="Premium" value={stats?.premiumUsers ?? 0} color="yellow" />
          <StatCard icon={<TrendingUp size={20} />} label="Hoy" value={stats?.newUsersToday ?? 0} color="green" />
          <StatCard icon={<TrendingUp size={20} />} label="Esta semana" value={stats?.newUsersWeek ?? 0} color="blue" />
          <StatCard icon={<BookOpen size={20} />} label="Cuentos" value={stats?.totalStories ?? 0} color="pink" />
          <StatCard icon={<span className="text-lg">🤖</span>} label="Cuentos IA" value={stats?.aiStoriesGenerated ?? 0} color="purple" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent users */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="font-black text-lg mb-4 flex items-center gap-2">
              <Users size={18} className="text-violet-400" />
              Últimos usuarios
            </h2>
            <div className="space-y-3">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="font-bold text-sm font-mono text-white/70">{u.id.slice(0, 12)}...</p>
                    <p className="text-white/30 text-xs">{new Date(u.created_at).toLocaleDateString('es-ES')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {u.is_premium && (
                      <span className="px-2 py-1 rounded-lg bg-yellow-500/20 text-yellow-400 text-xs font-black">PREMIUM</span>
                    )}
                    {u.ai_trial_used && (
                      <span className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-black">IA usada</span>
                    )}
                    {!u.is_premium && !u.ai_trial_used && (
                      <span className="px-2 py-1 rounded-lg bg-white/10 text-white/40 text-xs font-black">FREE</span>
                    )}
                  </div>
                </div>
              ))}
              {recentUsers.length === 0 && (
                <p className="text-white/30 text-sm text-center py-4">Sin usuarios aún</p>
              )}
            </div>
          </div>

          {/* Recent stories */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="font-black text-lg mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-pink-400" />
              Últimos cuentos generados
            </h2>
            <div className="space-y-3">
              {recentStories.map((s) => (
                <div key={s.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <span className="text-2xl">{s.cover_emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{s.title}</p>
                    <p className="text-white/30 text-xs">{s.theme} · {new Date(s.created_at).toLocaleDateString('es-ES')}</p>
                  </div>
                  {s.is_ai_generated && (
                    <span className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-black flex-shrink-0">IA</span>
                  )}
                </div>
              ))}
              {recentStories.length === 0 && (
                <p className="text-white/30 text-sm text-center py-4">Sin cuentos aún</p>
              )}
            </div>
          </div>
        </div>

        {/* Conversion rate */}
        {stats && stats.totalUsers > 0 && (
          <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 rounded-2xl p-6 border border-violet-500/20">
            <h2 className="font-black text-lg mb-4">📊 Conversión</h2>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-black text-violet-400">
                  {((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1)}%
                </p>
                <p className="text-white/50 text-sm font-bold mt-1">Conversión a Premium</p>
              </div>
              <div>
                <p className="text-3xl font-black text-pink-400">
                  {stats.premiumUsers > 0 ? `${(stats.premiumUsers * 2.99).toFixed(2)}€` : '0€'}
                </p>
                <p className="text-white/50 text-sm font-bold mt-1">MRR estimado</p>
              </div>
              <div>
                <p className="text-3xl font-black text-green-400">
                  {stats.totalUsers > 0 ? (stats.aiStoriesGenerated / stats.totalUsers).toFixed(1) : '0'}
                </p>
                <p className="text-white/50 text-sm font-bold mt-1">Cuentos IA / usuario</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode
  label: string
  value: number
  color: string
}) {
  const colors: Record<string, string> = {
    violet: 'text-violet-400 bg-violet-500/10',
    yellow: 'text-yellow-400 bg-yellow-500/10',
    green: 'text-green-400 bg-green-500/10',
    blue: 'text-blue-400 bg-blue-500/10',
    pink: 'text-pink-400 bg-pink-500/10',
    purple: 'text-purple-400 bg-purple-500/10',
  }
  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-2xl font-black">{value.toLocaleString()}</p>
      <p className="text-white/40 text-xs font-bold mt-1">{label}</p>
    </div>
  )
}
