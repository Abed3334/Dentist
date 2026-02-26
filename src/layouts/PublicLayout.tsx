import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <PublicNavbar />
      <main className="pt-16 sm:pt-20">
        <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center"><div className="animate-spin w-10 h-10 border-2 border-[#0F766E] border-t-transparent rounded-full" /></div>}>
          <Outlet />
        </Suspense>
      </main>
      <PublicFooter />
    </div>
  );
}
