export enum PaymentStatus {
  CANCELED='CANCELED',
  ACTIVE='ACTIVE',
  INACTIVE='INACTIVE',
}

export enum Price {
  FREE = '0',
  PREMIUM = '1000',
}

export enum Platform {
  ios = 'ios',
  android = 'android',
}

export enum SubscriptionStatus {
  active='active',
  past_due='past_due',
  unpaid='unpaid',
  canceled='canceled',
  incomplete='incomplete',
  incomplete_expired='incomplete_expired',
  trialing='trialing',
  paused='paused',
}

export enum InvoiceStatus {
  draft='draft',
  open='open',
  paid='paid',
  void='void',
  uncollectible='uncollectible'
}