'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

interface NavbarProps {
  isLoggedIn?: boolean
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:animate-spin-slow transition-all">🌟</span>
            <span className="font-heading text-xl text-primary-600 leading-none">
              MiMundoMagico
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="btn-ghost">
                  Mis cuentos
                </Link>
                <Link href="/cuentos" className="btn-ghost">
                  Biblioteca
                </Link>
                <Link href="/perfil/nuevo" className="btn-ghost">
                  Nuevo perfil
                </Link>
                <Link href="/dashboard" className="btn-primary">
                  <Sparkles className="w-4 h-4" />
                  Mi cuenta
                </Link>
              </>
            ) : (
              <>
                <Link href="/cuentos" className="btn-ghost">
                  Cuentos
                </Link>
                <Link href="/#como-funciona" className="btn-ghost">
                  Cómo funciona
                </Link>
                <Link href="/#precios" className="btn-ghost">
                  Precios
                </Link>
                <Link href="/login" className="btn-secondary text-sm px-4 py-2">
                  Iniciar sesión
                </Link>
                <Link href="/registro" className="btn-primary text-sm px-4 py-2">
                  <Sparkles className="w-4 h-4" />
                  Empieza gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-purple-100 bg-white/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="block btn-ghost w-full text-left" onClick={() => setMenuOpen(false)}>
                  Mis cuentos
                </Link>
                <Link href="/cuentos" className="block btn-ghost w-full text-left" onClick={() => setMenuOpen(false)}>
                  Biblioteca
                </Link>
                <Link href="/perfil/nuevo" className="block btn-ghost w-full text-left" onClick={() => setMenuOpen(false)}>
                  Nuevo perfil
                </Link>
              </>
            ) : (
              <>
                <Link href="/cuentos" className="block btn-ghost w-full text-left" onClick={() => setMenuOpen(false)}>
                  Cuentos
                </Link>
                <Link href="/#como-funciona" className="block btn-ghost w-full text-left" onClick={() => setMenuOpen(false)}>
                  Cómo funciona
                </Link>
                <Link href="/#precios" className="block btn-ghost w-full text-left" onClick={() => setMenuOpen(false)}>
                  Precios
                </Link>
                <div className="pt-2 flex flex-col gap-2">
                  <Link href="/login" className="btn-secondary w-full" onClick={() => setMenuOpen(false)}>
                    Iniciar sesión
                  </Link>
                  <Link href="/registro" className="btn-primary w-full" onClick={() => setMenuOpen(false)}>
                    <Sparkles className="w-4 h-4" />
                    Empieza gratis
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
