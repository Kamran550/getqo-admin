import request from './request';

const benefitService = {
  getAll: (params) => request.get('dashboard/admin/benefits', { params }),
  getById: (type, params) =>
    request.get(`dashboard/admin/benefits/${type}`, { params }),
  update: (id, data) => request.put(`dashboard/admin/benefits/${id}`, data),
  create: (data) => request.post(`dashboard/admin/benefits`, data),
  setActive: (id, data) =>
    request.post(`dashboard/admin/benefits/${id}/active/status`, data),
};

export default benefitService;
