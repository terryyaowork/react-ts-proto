import React, { Suspense } from 'react';
import type { LayoutProps } from '../../typings/layouts/main/Layout';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary';

import Header from './Header';
import Footer from './Footer';
import EffectWrapper from '../EffectWrapper';

const Layout: React.FC<LayoutProps> = ({ mainClassName = '', mainStyle = {} }) => (
  <>
    <Header />
    <ErrorBoundary>
      <Suspense fallback={<p>Loading page...</p>}>
        <main className={mainClassName} style={mainStyle}>
          <Outlet />
        </main>
      </Suspense>
    </ErrorBoundary>
    <Footer />
    <EffectWrapper />
  </>
);

export default Layout;
