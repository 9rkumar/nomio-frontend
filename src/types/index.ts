export interface CartItem {
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface User {
    id: string;
    username: string;
    email: string;
    address: string;
    role: 'nomi' | 'nomia' | 'rasik' | 'rasika' | 'superadmin';
    isSubscribed?: boolean;
  }
  
  export interface Order {
    orderId: string;
    userId: string;
    items: CartItem[];
    total: number;
    address: string;
    status: 'created' | 'accepted' | 'delivering' | 'arrived' | 'delivered';
    createdAt: string;
  }
  
  export interface SubscriptionPlan {
    plan: 'Weekly' | 'Monthly' | 'Yearly';
    price: number;
  }