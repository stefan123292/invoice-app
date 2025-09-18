import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { invoicesApi } from '../api/invoices';
import type { Invoice } from '../types/index.js';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { logout } from '../store/authSlice';
import InvoiceModal from '../components/InvoiceModal';
import InvoiceList from '../components/InvoiceList';
import Button from '../components/ui/Button';
import styles from '../styles/layouts/DashboardLayout.module.css';

const Invoices: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: invoicesApi.getInvoices,
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  const getTotalAmount = () => {
    if (!invoices) return 0;
    return invoices.reduce((total, invoice) => total + invoice.amount, 0);
  };

  const getPaidAmount = () => {
    if (!invoices) return 0;
    return invoices.reduce((total, invoice) => invoice.paid ? total + invoice.amount : total, 0);
  };

  const getUnpaidAmount = () => {
    return getTotalAmount() - getPaidAmount();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className={styles.dashboardLayout}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboardLayout}>
        <div className={styles.error}>
          <svg className={styles.errorIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className={styles.errorTitle}>Error loading invoices</h3>
          <p className={styles.errorMessage}>
            There was a problem loading your invoices. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardLayout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.headerTitle}>Invoice Dashboard</h1>
              <p className={styles.headerSubtitle}>
                Manage your invoices and track payments
              </p>
            </div>
          </div>
          
          <div className={styles.headerRight}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <div className={styles.userName}>{user?.name}</div>
              </div>
            </div>
            
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        {/* Stats Cards */}
        {invoices && invoices.length > 0 && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 'var(--spacing-6)', 
            marginBottom: 'var(--spacing-8)' 
          }}>
            <div style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-6)',
              boxShadow: 'var(--shadow-base)',
              border: '1px solid var(--color-gray-200)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '24px', height: '24px', color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-gray-900)' }}>
                    {invoices.length}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
                    Total Invoices
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-6)',
              boxShadow: 'var(--shadow-base)',
              border: '1px solid var(--color-gray-200)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-success-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '24px', height: '24px', color: 'var(--color-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-gray-900)' }}>
                    {formatCurrency(getPaidAmount())}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
                    Paid Amount
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-6)',
              boxShadow: 'var(--shadow-base)',
              border: '1px solid var(--color-gray-200)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-danger-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '24px', height: '24px', color: 'var(--color-danger)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-gray-900)' }}>
                    {formatCurrency(getUnpaidAmount())}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
                    Outstanding
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoice List */}
        <div className={styles.content}>
          <div style={{ padding: 'var(--spacing-6)' }}>
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <h2 style={{ 
                fontSize: 'var(--font-size-xl)', 
                fontWeight: 'var(--font-weight-semibold)', 
                color: 'var(--color-gray-900)',
                margin: '0 0 var(--spacing-2) 0'
              }}>
                Recent Invoices
              </h2>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--color-gray-600)',
                margin: 0
              }}>
                Click on any invoice to view details
              </p>
            </div>
            
            <InvoiceList
              invoices={invoices || []}
              onInvoiceClick={setSelectedInvoiceId}
              loading={isLoading}
            />
          </div>
        </div>
      </main>

      {/* Invoice Modal */}
      {selectedInvoiceId && (
        <InvoiceModal
          invoiceId={selectedInvoiceId}
          isOpen={!!selectedInvoiceId}
          onClose={() => setSelectedInvoiceId(null)}
        />
      )}
    </div>
  );
};

export default Invoices;
