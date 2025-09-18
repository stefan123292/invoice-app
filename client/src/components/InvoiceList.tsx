import React from 'react';
import type { Invoice } from '../types/index.js';
import styles from '../styles/components/InvoiceList.module.css';

interface InvoiceListProps {
  invoices: Invoice[];
  onInvoiceClick: (invoiceId: string) => void;
  loading?: boolean;
}

const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  onInvoiceClick,
  loading = false
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getInvoiceStatus = (invoice: Invoice) => {
    if (invoice.paid) return 'paid';
    
    const dueDate = new Date(invoice.dueDate);
    const today = new Date();
    
    if (dueDate < today) return 'overdue';
    return 'unpaid';
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'overdue': return 'Overdue';
      case 'unpaid': return 'Unpaid';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className={styles.invoiceList}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.skeletonItem}>
            <div className={styles.skeletonHeader}>
              <div className={`${styles.skeletonAvatar} ${styles.skeleton}`} />
              <div style={{ flex: 1 }}>
                <div className={`${styles.skeletonTextLarge} ${styles.skeleton}`} style={{ width: '60%', marginBottom: '8px' }} />
                <div className={`${styles.skeletonText} ${styles.skeleton}`} style={{ width: '40%' }} />
              </div>
            </div>
            <div className={`${styles.skeletonText} ${styles.skeleton}`} style={{ width: '30%', marginLeft: 'auto' }} />
          </div>
        ))}
      </div>
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <div className={styles.emptyState}>
        <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className={styles.emptyTitle}>No invoices found</h3>
        <p className={styles.emptyDescription}>
          Your invoices will appear here when they're available.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.invoiceList}>
      {invoices.map((invoice) => {
        const status = getInvoiceStatus(invoice);
        
        return (
          <div
            key={invoice.id}
            className={styles.invoiceItem}
            onClick={() => onInvoiceClick(invoice.id)}
          >
            <div className={styles.invoiceHeader}>
              <div className={styles.vendorInfo}>
                <div className={styles.vendorAvatar}>
                  {invoice.vendorName.charAt(0).toUpperCase()}
                </div>
                <div className={styles.vendorDetails}>
                  <h3 className={styles.vendorName}>
                    {invoice.vendorName}
                  </h3>
                  {invoice.description && (
                    <p className={styles.invoiceDescription}>
                      {invoice.description}
                    </p>
                  )}
                </div>
              </div>
              
              <div className={styles.invoiceAmount}>
                <div className={styles.amount}>
                  {formatCurrency(invoice.amount)}
                </div>
                <div className={styles.dueDate}>
                  Due: {formatDate(invoice.dueDate)}
                </div>
              </div>
            </div>

            <div className={styles.invoiceFooter}>
              <div className={styles.invoiceId}>
                #{invoice.id.slice(-8)}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                <span className={`${styles.statusBadge} ${styles[status]}`}>
                  {getStatusText(status)}
                </span>
                
                <svg className={styles.chevron} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvoiceList;
