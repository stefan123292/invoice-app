import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { invoicesApi } from '../api/invoices';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { logout } from '../store/authSlice';
import InvoiceModal from '../components/InvoiceModal';
import InvoiceTable from '../components/InvoiceTable';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/ui/Button';
import styles from '../styles/pages/Invoices.module.css';

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
      <DashboardLayout>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading invoices...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className={styles.errorContainer}>
          <svg className={styles.errorIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className={styles.errorTitle}>Error loading invoices</h3>
          <p className={styles.errorMessage}>
            There was a problem loading your invoices. Please try again later.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Invoice Dashboard</h1>
            <p>Manage your invoices and track payments</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className={styles.userName}>{user?.name}</span>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {invoices && invoices.length > 0 && (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statCardContent}>
                <div className={`${styles.statIcon} ${styles.primary}`}>
                  <svg style={{ width: '24px', height: '24px', color: '#6366f1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className={styles.statValue}>
                    {invoices.length}
                  </div>
                  <div className={styles.statLabel}>
                    Total Invoices
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statCardContent}>
                <div className={`${styles.statIcon} ${styles.success}`}>
                  <svg style={{ width: '24px', height: '24px', color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <div className={styles.statValue}>
                    {formatCurrency(getPaidAmount())}
                  </div>
                  <div className={styles.statLabel}>
                    Paid Amount
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statCardContent}>
                <div className={`${styles.statIcon} ${styles.warning}`}>
                  <svg style={{ width: '24px', height: '24px', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <div className={styles.statValue}>
                    {formatCurrency(getUnpaidAmount())}
                  </div>
                  <div className={styles.statLabel}>
                    Outstanding
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoice Table */}
        <InvoiceTable
          invoices={invoices || []}
          onInvoiceClick={setSelectedInvoiceId}
          loading={isLoading}
        />

        {/* Invoice Modal */}
        {selectedInvoiceId && (
          <InvoiceModal
            invoiceId={selectedInvoiceId}
            isOpen={!!selectedInvoiceId}
            onClose={() => setSelectedInvoiceId(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Invoices;
