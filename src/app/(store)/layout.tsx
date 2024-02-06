import Header from '@/components/header'
import { ReactNode } from 'react'

export default function storeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
