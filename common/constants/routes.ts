export const APP_ROUTES = {
  HOME: "/",
  PAGE_404: "/404",
  LOGIN: "/login",
  LIST_INQUIRY: "/inquiry",
  DetailInquiry: (id: string) => `/inquiry/${id}`,
  CREATE_INQUIRY: "/inquiry/create"
};
