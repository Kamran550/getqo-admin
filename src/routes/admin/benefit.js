// ** React Imports
import { lazy } from 'react';

const BenefitsRoutes = [
  {
    path: 'settings/benefit',
    component: lazy(() => import('views/benefits')),
  },
  {
    path: 'settings/benefit/add',
    component: lazy(() => import('views/benefits/benefit-add')),
  },
  {
    path: 'settings/benefit/:type',
    component: lazy(() => import('views/benefits/benefit-edit')),
  },
];

export default BenefitsRoutes;
