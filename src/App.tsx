/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { BlogModal } from './components/BlogModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { FleetPage } from './pages/FleetPage';
import { WhyChooseUsPage } from './pages/WhyChooseUsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { QuotePage } from './pages/QuotePage';
import { AdminDashboard } from './pages/AdminDashboard';

import { AuthProvider } from './context/AuthContext';
import { ScrollProgress, PageTransition } from './components/motion';
import { ToastProvider } from './components/ui/Toast';
import { TenderModal } from './components/TenderModal';

const MainRouter: React.FC = () => {
  const { activePage, isTenderModalOpen, setIsTenderModalOpen, tenderPrefillSector } = useApp();

  const renderCurrentPage = () => {
    if (activePage === 'admin' || activePage.startsWith('admin/')) {
      return <AdminDashboard />;
    }

    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'fleet':
        return <FleetPage />;
      case 'why-choose-us':
        return <WhyChooseUsPage />;
      case 'insights':
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case 'quote':
        return <QuotePage />;
      default:
        return <HomePage />;
    }
  };

  const isAdminRoute = activePage === 'admin' || activePage.startsWith('admin/');

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FA] text-[#333333]">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <PageTransition pageKey={activePage}>
          {renderCurrentPage()}
        </PageTransition>
      </main>
      {!isAdminRoute && <Footer />}
      <ProjectModal />
      <BlogModal />
      <TenderModal
        isOpen={isTenderModalOpen}
        onClose={() => setIsTenderModalOpen(false)}
        prefillSector={tenderPrefillSector}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ToastProvider>
          <MainRouter />
        </ToastProvider>
      </AppProvider>
    </AuthProvider>
  );
}
