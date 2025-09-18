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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <div 
        className={`${styles.modal} ${styles.medium}`}
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 10000 }}
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
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      padding: 'var(--spacing-8)' 
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        border: '3px solid var(--color-gray-200)',
                        borderTop: '3px solid var(--color-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                    </div>
                  )}

                  {error && (
                    <div style={{
                      padding: 'var(--spacing-4)',
                      backgroundColor: 'var(--color-danger-light)',
                      border: '1px solid var(--color-danger)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-danger)',
                      textAlign: 'center'
                    }}>
                      Error loading invoice details
                    </div>
                  )}

                  {invoice && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
                      {/* Invoice Header */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-4)',
                        padding: 'var(--spacing-6)',
                        backgroundColor: 'var(--color-gray-50)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-gray-200)'
                      }}>
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: 'var(--radius-lg)',
                          background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-white)',
                          fontSize: 'var(--font-size-xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          textTransform: 'uppercase'
                        }}>
                          {invoice.vendorName.charAt(0)}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontSize: 'var(--font-size-xl)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--color-gray-900)',
                            margin: '0 0 var(--spacing-1) 0'
                          }}>
                            {invoice.vendorName}
                          </h3>
                          
                          <div style={{
                            fontSize: 'var(--font-size-3xl)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-gray-900)',
                            margin: 'var(--spacing-2) 0'
                          }}>
                            {formatCurrency(invoice.amount)}
                          </div>
                          
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)'
                          }}>
                            <span style={{
                              fontSize: 'var(--font-size-sm)',
                              color: 'var(--color-gray-600)'
                            }}>
                              Due: {formatDate(invoice.dueDate)}
                            </span>
                            
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 'var(--spacing-1)',
                              padding: 'var(--spacing-1) var(--spacing-3)',
                              borderRadius: 'var(--radius-full)',
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.025em',
                              ...(getInvoiceStatus() === 'paid' ? {
                                backgroundColor: 'var(--color-success-light)',
                                color: 'var(--color-success)'
                              } : getInvoiceStatus() === 'overdue' ? {
                                backgroundColor: 'var(--color-warning-light)',
                                color: 'var(--color-warning)'
                              } : {
                                backgroundColor: 'var(--color-danger-light)',
                                color: 'var(--color-danger)'
                              })
                            }}>
                              <span style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: 'currentColor'
                              }}></span>
                              {getStatusText(getInvoiceStatus())}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Invoice Details */}
                      {invoice.description && (
                        <div>
                          <h4 style={{
                            fontSize: 'var(--font-size-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--color-gray-900)',
                            margin: '0 0 var(--spacing-3) 0'
                          }}>
                            Description
                          </h4>
                          <p style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-gray-600)',
                            lineHeight: 'var(--line-height-relaxed)',
                            margin: 0,
                            padding: 'var(--spacing-4)',
                            backgroundColor: 'var(--color-gray-50)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-gray-200)'
                          }}>
                            {invoice.description}
                          </p>
                        </div>
                      )}

                      {/* Invoice Metadata */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 'var(--spacing-4)'
                      }}>
                        <div style={{
                          padding: 'var(--spacing-4)',
                          backgroundColor: 'var(--color-gray-50)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-gray-200)'
                        }}>
                          <div style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-gray-500)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: 'var(--spacing-2)'
                          }}>
                            Invoice ID
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-family-mono)',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-gray-900)',
                            wordBreak: 'break-all'
                          }}>
                            {invoice.id}
                          </div>
                        </div>
                        
                        <div style={{
                          padding: 'var(--spacing-4)',
                          backgroundColor: 'var(--color-gray-50)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-gray-200)'
                        }}>
                          <div style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-gray-500)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: 'var(--spacing-2)'
                          }}>
                            Created Date
                          </div>
                          <div style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-gray-900)'
                          }}>
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
