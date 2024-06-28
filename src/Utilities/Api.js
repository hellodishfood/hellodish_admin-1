// export const Baseurl = "https://api.hellodish.in/restaurant/api/";
// export const baseurl = "https://api.hellodish.in/";

export const Baseurl = "https://50fd-2409-40e5-1004-1652-cd8-e91c-459a-edf1.ngrok-free.app/restaurant/api/";
export const baseurl = "https://50fd-2409-40e5-1004-1652-cd8-e91c-459a-edf1.ngrok-free.app/";

export const token = localStorage.getItem("authToken");

export const LoginApi = `${Baseurl}login`;
export const PendingDriverApi = `admin/api/getDriverApprovalPending`;
export const DriverApi = `admin/api/getDriverApproved`;
export const PendingRestaurantApi = `admin/api/getRestaurantApprovalPending`
export const RestaurantApi = `admin/api/getRestaurantApproved`;
export const UpdateRestaurantStatusApi= `admin/api/updateStatusApproveAndReject`
export const UpdateRestaurantTimeApi = `restaurant/api/updateRestaurantTime`