// ** React Imports
import { lazy } from 'react';

const SellerCouponRoutes = [
  {
    path: 'seller/coupons',
    component: lazy(() => import('views/seller-views/coupons')),
  },
  {
    path: 'seller/coupon/add',
    component: lazy(() => import('views/seller-views/coupons/coupon-add')),
  },
  {
    path: 'seller/coupon/:id',
    component: lazy(() => import('views/seller-views/coupons/coupon-edit')),
  },
];

export default SellerCouponRoutes;
