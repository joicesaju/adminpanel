import React from 'react'
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
  Main,
  DepartmentListing,
} from '../components/index'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div>
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
