'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Users, BookOpen, Star, TrendingUp, RefreshCw, LogOut, Settings, Megaphone, Layout, Tag } from 'lucide-react'

const ADMIN_EMAILS = ['legal@mimundomagico.es', 'javierpatoprieto@gmail.com']

interface SiteSetting {
  key: string
  value: string
  label: string
  description: string
  type: string
  category: string
  sort_order: number
}

interface Stats {
  totalUsers: number
  premiumUsers: number
  totalStories: number
  aiStoriesGenerated: number
  newUsersToday: number
  newUsersWeek: number
}

type AdminTab = 'stats' | 'users' | 'landing' | 'pricing' | 'promo' | 'general'

interface UserRow {
  id: string
  email: string
  is_premium: boolean
  ai_trial_used: boolean
  created_at: string
  stripe_customer_id: string | null
  child_count: number
  stories_count: number
}

export default function AdminPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<AdminTab>('stats')
  const [stats, setStats] = useState<Stats | null>(null)
  const [users, setUsers] = useState<UserRow[]>([])
  const [usersLoaded, setUsersLoaded] = useState(false)
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [userSearch, setUserSearch] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const email = data.user?.email ?? ''
      if (!ADMIN_EMAILS.includes(email)) {
        router.replace('/')
        return
      }
      setUserEmail(email)
      setAuthorized(true)
      loadStats()
      loadSettings()
    })
  }, [router])

  const loadUsers = async () => {
    // Load profiles
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email, is_premium, ai_trial_used, created_at, stripe_customer_id')
      .order('created_at', { ascending: false })

    // Load child counts
    const { data: children } = await supabase
      .from('child_profiles')
      .select('user_id')

    // Load story counts
    const { data: userStories } = await supabase
      .from('user_stories')
      .select('user_id')

    const childMap: Record<string, number> = {}
    for (const c of children || []) childMap[c.user_id] = (childMap[c.user_id] || 0) + 1

    const storyMap: Record<string, number> = {}
    for (const s of userStories || []) storyMap[s.user_id] = (storyMap[s.user_id] || 0) + 1

    setUsers((profiles || []).map(p => ({
      ...p,
      child_count: childMap[p.id] || 0,
      stories_count: storyMap[p.id] || 0,
    })))
    setUsersLoaded(true)
  }

  const loadStats = async () => {
    const { data: profiles } = await supabase.from('profiles').select('id, is_premium, created_at')
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const { data: stories } = await supabase.from('stories').select('id, is_ai_generated')

    setStats({
      totalUsers: profiles?.length ?? 0,
      premiumUsers: profiles?.filter(p => p.is_premium).length ?? 0,
      newUsersToday: profiles?.filter(p => p.created_at >= todayStart).length ?? 0,
      newUsersWeek: profiles?.filter(p => p.created_at >= weekStart).length ?? 0,
      totalStories: stories?.length ?? 0,
      aiStoriesGenerated: stories?.filter(s => s.is_ai_generated).length ?? 0,
    })
    setLoading(false)
  }

  const getAuthHeader = async () => {
    const { data } = await supabase.auth.getSession()
    return data.session?.access_token ? `Bearer ${data.session.access_token}` : ''
  }

  const loadSettings = async () => {
    const auth = await getAuthHeader()
    const res = await fetch('/api/admin/settings', {
      headers: { 'Authorization': auth }
    })
    const data = await res.json()
    setSettings(data.settings || [])
  }

  const updateSetting = async (key: string, value: string) => {
    setSaving(key)
    const auth = await getAuthHeader()
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': auth },
      body: JSON.stringify({ key, value })
    })
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s))
    setSaving(null)
    setSaved(key)
    setTimeout(() => setSaved(null), 2000)
  }

  // Load users when tab is opened
  useEffect(() => {
    if (activeTab === 'users' && !usersLoaded && authorized) loadUsers()
  }, [activeTab, authorized])

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

  const settingsByCategory = settings.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {} as Record<string, SiteSetting[]>)

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: 'stats', label: 'Estadísticas', icon: <TrendingUp size={16} /> },
    { key: 'users', label: `Usuarios (${stats?.totalUsers ?? 0})`, icon: <Users size={16} /> },
    { key: 'landing', label: 'Landing', icon: <Layout size={16} /> },
    { key: 'pricing', label: 'Precios', icon: <Tag size={16} /> },
    { key: 'promo', label: 'Promociones', icon: <Megaphone size={16} /> },
    { key: 'general', label: 'General', icon: <Settings size={16} /> },
  ]

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
          <button onClick={() => { loadStats(); loadSettings() }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-colors">
            <RefreshCw size={14} />Actualizar
          </button>
          <button onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-bold transition-colors">
            <LogOut size={14} />Salir
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10 px-6">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-black whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-violet-400 text-violet-300'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* STATS TAB */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard icon={<Users size={20} />} label="Usuarios" value={stats?.totalUsers ?? 0} color="violet" />
              <StatCard icon={<Star size={20} />} label="Premium" value={stats?.premiumUsers ?? 0} color="yellow" />
              <StatCard icon={<TrendingUp size={20} />} label="Hoy" value={stats?.newUsersToday ?? 0} color="green" />
              <StatCard icon={<TrendingUp size={20} />} label="Esta semana" value={stats?.newUsersWeek ?? 0} color="blue" />
              <StatCard icon={<BookOpen size={20} />} label="Cuentos" value={stats?.totalStories ?? 0} color="pink" />
              <StatCard icon={<span className="text-lg">🤖</span>} label="Cuentos IA" value={stats?.aiStoriesGenerated ?? 0} color="purple" />
            </div>
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
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black text-xl">👥 Usuarios registrados</h2>
              <button onClick={() => { setUsersLoaded(false); loadUsers() }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-colors">
                <RefreshCw size={14} />Actualizar
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Buscar por email..."
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              className="w-full mb-4 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-400 text-sm"
            />

            {/* Stats row */}
            <div className="flex gap-4 mb-6">
              <div className="bg-violet-500/20 rounded-xl px-4 py-2 text-sm">
                <span className="font-black text-violet-300">{users.length}</span>
                <span className="text-white/50 ml-2">total</span>
              </div>
              <div className="bg-amber-500/20 rounded-xl px-4 py-2 text-sm">
                <span className="font-black text-amber-300">{users.filter(u => u.is_premium).length}</span>
                <span className="text-white/50 ml-2">premium</span>
              </div>
              <div className="bg-green-500/20 rounded-xl px-4 py-2 text-sm">
                <span className="font-black text-green-300">
                  {users.length > 0 ? ((users.filter(u => u.is_premium).length / users.length) * 100).toFixed(1) : 0}%
                </span>
                <span className="text-white/50 ml-2">conversión</span>
              </div>
              <div className="bg-pink-500/20 rounded-xl px-4 py-2 text-sm">
                <span className="font-black text-pink-300">
                  {(users.filter(u => u.is_premium).length * 2.99).toFixed(2)}€
                </span>
                <span className="text-white/50 ml-2">MRR</span>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-12 text-xs font-black text-white/40 uppercase px-4 py-3 border-b border-white/10">
                <span className="col-span-4">Email</span>
                <span className="col-span-2">Plan</span>
                <span className="col-span-2">Registro</span>
                <span className="col-span-1 text-center">Hijos</span>
                <span className="col-span-1 text-center">Cuentos</span>
                <span className="col-span-2">IA trial</span>
              </div>
              {users
                .filter(u => !userSearch || u.email?.toLowerCase().includes(userSearch.toLowerCase()))
                .map((u, i) => (
                  <div key={u.id} className={`grid grid-cols-12 items-center px-4 py-3 text-sm ${
                    i % 2 === 0 ? '' : 'bg-white/5'
                  } border-b border-white/5 last:border-0`}>
                    <span className="col-span-4 text-white/70 font-mono text-xs truncate pr-2">
                      {u.email || u.id.slice(0, 16) + '...'}
                    </span>
                    <span className="col-span-2">
                      {u.is_premium
                        ? <span className="bg-amber-500/20 text-amber-300 text-xs font-black px-2 py-1 rounded-lg">👑 PREMIUM</span>
                        : <span className="bg-white/10 text-white/40 text-xs font-black px-2 py-1 rounded-lg">FREE</span>
                      }
                    </span>
                    <span className="col-span-2 text-white/40 text-xs">
                      {new Date(u.created_at).toLocaleDateString('es-ES')}
                    </span>
                    <span className="col-span-1 text-center text-white/60 font-black">{u.child_count}</span>
                    <span className="col-span-1 text-center text-white/60 font-black">{u.stories_count}</span>
                    <span className="col-span-2">
                      {u.ai_trial_used
                        ? <span className="text-purple-400 text-xs font-black">✓ Usada</span>
                        : <span className="text-white/30 text-xs">Disponible</span>
                      }
                    </span>
                  </div>
                ))
              }
              {users.length === 0 && (
                <div className="text-center py-12 text-white/30">
                  <p className="font-black">Sin usuarios aún</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SETTINGS TABS */}
        {activeTab !== 'stats' && activeTab !== 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black text-xl">
                {activeTab === 'landing' && '🖥️ Textos de la Landing'}
                {activeTab === 'pricing' && '💰 Precios y Pagos'}
                {activeTab === 'promo' && '🎉 Promociones'}
                {activeTab === 'general' && '⚙️ Configuración General'}
              </h2>
              <p className="text-white/30 text-xs">Los cambios se aplican inmediatamente</p>
            </div>

            {(settingsByCategory[activeTab] || []).map(setting => (
              <SettingField
                key={setting.key}
                setting={setting}
                saving={saving === setting.key}
                saved={saved === setting.key}
                onSave={updateSetting}
              />
            ))}

            {(!settingsByCategory[activeTab] || settingsByCategory[activeTab].length === 0) && (
              <div className="text-center py-12 text-white/30">
                <p className="font-black">No hay ajustes en esta categoría</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function SettingField({ setting, saving, saved, onSave }: {
  setting: SiteSetting
  saving: boolean
  saved: boolean
  onSave: (key: string, value: string) => void
}) {
  const [localValue, setLocalValue] = useState(setting.value)
  const isDirty = localValue !== setting.value

  return (
    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-black text-white text-sm">{setting.label}</p>
          {setting.description && (
            <p className="text-white/30 text-xs mt-0.5">{setting.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 ml-4">
          {saved && <span className="text-green-400 text-xs font-black">✓ Guardado</span>}
          {(isDirty || saving) && (
            <button
              onClick={() => onSave(setting.key, localValue)}
              disabled={saving}
              className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-black rounded-xl transition-colors disabled:opacity-50"
            >
              {saving ? '...' : 'Guardar'}
            </button>
          )}
        </div>
      </div>

      {setting.type === 'boolean' ? (
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => {
              const newVal = localValue === 'true' ? 'false' : 'true'
              setLocalValue(newVal)
              onSave(setting.key, newVal)
            }}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              localValue === 'true' ? 'bg-violet-500' : 'bg-gray-600'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
              localValue === 'true' ? 'left-7' : 'left-1'
            }`} />
          </button>
          <span className="text-sm font-bold text-white/70">
            {localValue === 'true' ? 'Activado' : 'Desactivado'}
          </span>
        </div>
      ) : setting.type === 'textarea' ? (
        <textarea
          value={localValue}
          onChange={e => setLocalValue(e.target.value)}
          rows={3}
          className="w-full mt-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm font-medium placeholder-white/30 focus:outline-none focus:border-violet-400 resize-none transition-colors"
        />
      ) : (
        <input
          type="text"
          value={localValue}
          onChange={e => setLocalValue(e.target.value)}
          className="w-full mt-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm font-medium placeholder-white/30 focus:outline-none focus:border-violet-400 transition-colors"
        />
      )}

      <p className="text-white/20 text-xs mt-2 font-mono">{setting.key}</p>
    </div>
  )
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: number; color: string
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
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colors[color]}`}>{icon}</div>
      <p className="text-2xl font-black">{value.toLocaleString()}</p>
      <p className="text-white/40 text-xs font-bold mt-1">{label}</p>
    </div>
  )
}
