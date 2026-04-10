import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-white">
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  )
}
