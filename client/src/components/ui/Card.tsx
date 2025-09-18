import React from 'react';
import styles from '../../styles/components/Card.module.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'elevated' | 'bordered';
  status?: 'success' | 'warning' | 'danger';
  compact?: boolean;
  className?: string;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
  Title: React.FC<CardTitleProps>;
  Subtitle: React.FC<CardSubtitleProps>;
} = ({
  children,
  variant = 'default',
  status,
  compact = false,
  className = '',
  onClick,
}) => {
  const cardClasses = [
    styles.card,
    variant === 'interactive' && styles.interactive,
    variant === 'elevated' && styles.elevated,
    variant === 'bordered' && styles.bordered,
    status && styles[status],
    compact && styles.compact,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`${styles.cardHeader} ${className}`}>
    {children}
  </div>
);

const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div className={`${styles.cardBody} ${className}`}>
    {children}
  </div>
);

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`${styles.cardFooter} ${className}`}>
    {children}
  </div>
);

const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => (
  <h3 className={`${styles.cardTitle} ${className}`}>
    {children}
  </h3>
);

const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, className = '' }) => (
  <p className={`${styles.cardSubtitle} ${className}`}>
    {children}
  </p>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;

export default Card;
