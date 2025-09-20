import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { invoicesApi } from '../api/invoices';
import Button from './ui/Button';
import styles from '../styles/components/Modal.module.css';

interface InvoiceModalProps {
  invoiceId: string;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  invoiceId,
  isOpen,
  onClose,
}) => {
  const { data: invoice, isLoading, error } = useQuery({
    queryKey: ['invoice', invoiceId],
    queryFn: () => invoicesApi.getInvoice(invoiceId),
    enabled: !!invoiceId && isOpen,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getInvoiceStatus = () => {
    if (!invoice) return 'unpaid';
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

  if (!isOpen) return null;

  return (
    <div 
      className={styles.overlay}
      onClick={onClose}
    >
      <div 
        className={`${styles.modal} ${styles.medium}`}
        onClick={(e) => e.stopPropagation()}
      >
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalTitle}>
                    Invoice Details
                  </h2>
                  <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onClose}
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className={styles.modalBody}>
                  {isLoading && (
                    <div className={styles.loadingContainer}>
                      <div className={styles.loadingSpinner}></div>
                    </div>
                  )}

                  {error && (
                    <div className={styles.errorContainer}>
                      Error loading invoice details
                    </div>
                  )}

                  {invoice && (
                    <div className={styles.invoiceDetails}>
                      {/* Invoice Header */}
                      <div className={styles.invoiceHeader}>
                        <div className={styles.vendorAvatar}>
                          {invoice.vendorName.charAt(0)}
                        </div>
                        
                        <div className={styles.vendorInfo}>
                          <h3 className={styles.vendorName}>
                            {invoice.vendorName}
                          </h3>
                          
                          <div className={styles.amount}>
                            {formatCurrency(invoice.amount)}
                          </div>
                          
                          <div className={styles.statusRow}>
                            <span className={styles.dueDate}>
                              Due: {formatDate(invoice.dueDate)}
                            </span>
                            
                            <span className={`${styles.statusBadge} ${styles[getInvoiceStatus()]}`}>
                              <span className={styles.statusDot}></span>
                              {getStatusText(getInvoiceStatus())}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Invoice Details */}
                      {invoice.description && (
                        <div>
                          <h4 className={styles.descriptionTitle}>
                            Description
                          </h4>
                          <p className={styles.descriptionText}>
                            {invoice.description}
                          </p>
                        </div>
                      )}

                      {/* Invoice Metadata */}
                      <div className={styles.metadataGrid}>
                        <div className={styles.metadataItem}>
                          <div className={styles.metadataLabel}>
                            Invoice ID
                          </div>
                          <div className={styles.metadataValue}>
                            {invoice.id}
                          </div>
                        </div>
                        
                        <div className={styles.metadataItem}>
                          <div className={styles.metadataLabel}>
                            Created Date
                          </div>
                          <div className={styles.metadataValue}>
                            {formatDate(invoice.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.modalFooter}>
                  <Button variant="secondary" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          );
};

export default InvoiceModal;
