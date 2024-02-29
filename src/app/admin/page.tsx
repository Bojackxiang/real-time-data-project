"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard")
  }, [
    router
  ])


  return null
}

export default AdminPage