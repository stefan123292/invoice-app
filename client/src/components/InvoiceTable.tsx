import React, { useState } from 'react';
import type { Invoice } from '../types/index.js';
import styles from '../styles/components/InvoiceTable.module.css';

interface InvoiceTableProps {
  invoices: Invoice[];
  onInvoiceClick: (invoiceId: string) => void;
  loading?: boolean;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  onInvoiceClick,
  loading = false
}) => {
  const [selectedInvoices, setSelectedInvoices] = useState<Set<string>>(new Set());

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
    return 'open';
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'overdue': return 'Overdue';
      case 'open': return 'Open';
      default: return 'Unknown';
    }
  };

  const toggleInvoiceSelection = (invoiceId: string) => {
    const newSelected = new Set(selectedInvoices);
    if (newSelected.has(invoiceId)) {
      newSelected.delete(invoiceId);
    } else {
      newSelected.add(invoiceId);
    }
    setSelectedInvoices(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedInvoices.size === invoices.length) {
      setSelectedInvoices(new Set());
    } else {
      setSelectedInvoices(new Set(invoices.map(invoice => invoice.id)));
    }
  };

  if (loading) {
    return (
      <div className={styles.invoiceTableCard}>
        <div className={styles.loadingState}>
          Loading invoices...
        </div>
      </div>
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <div className={styles.invoiceTableCard}>
        <div className={styles.emptyState}>
          <svg 
            className={styles.emptyIcon}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className={styles.emptyTitle}>No invoices found</h3>
          <p className={styles.emptyDescription}>Your invoices will appear here when they're available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.invoiceTableCard}>
      <table className={styles.invoiceTable}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedInvoices.size === invoices.length && invoices.length > 0}
                onChange={toggleSelectAll}
                className={styles.checkbox}
              />
            </th>
            <th>Date</th>
            <th>Payee</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const status = getInvoiceStatus(invoice);
            
            return (
              <tr key={invoice.id} onClick={() => onInvoiceClick(invoice.id)}>
                <td className={styles.checkboxCell} onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedInvoices.has(invoice.id)}
                    onChange={() => toggleInvoiceSelection(invoice.id)}
                    className={styles.checkbox}
                  />
                </td>
                <td>{formatDate(invoice.createdAt)}</td>
                <td>
                  <div className={styles.vendorCell}>
                    <div className={styles.vendorAvatar}>
                      {invoice.vendorName.charAt(0).toUpperCase()}
                    </div>
                    <span className={styles.vendorName}>{invoice.vendorName}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.descriptionCell}>
                    <div className={styles.invoiceId}>
                      Invoice #{invoice.id.slice(-8)}
                    </div>
                    {invoice.description && (
                      <div className={styles.invoiceDescription}>
                        {invoice.description}
                      </div>
                    )}
                  </div>
                </td>
                <td>{formatDate(invoice.dueDate)}</td>
                <td className={styles.amountCell}>{formatCurrency(invoice.amount)}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[status]}`}>
                    {getStatusText(status)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
