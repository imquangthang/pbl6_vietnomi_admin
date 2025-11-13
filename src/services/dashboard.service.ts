import instance from "../setup/axios";

const fetchTotalUsers = () => {
  return instance.get("/user/total");
};

const fetchTotalFoods = () => {
  return instance.get("/food/total");
};

const fetchTotalComments = () => {
  return instance.get("/comment/total");
};

const fetchTotalRatings = () => {
  return instance.get("/rating/total");
};

const fetchChartCustomerVelocity = () => {
  return instance.get("/user/chart-customer-velocity");
};

const fetchChartContentGrowthSpectrum = () => {
  return instance.get("/food/chart-content-growth-spectrum");
};

const fetchChartCoreEngagementIndex = () => {
  return instance.get("/rating/chart-core-engagement-index");
};

export {
  fetchTotalUsers,
  fetchTotalFoods,
  fetchTotalComments,
  fetchTotalRatings,
  fetchChartCustomerVelocity,
  fetchChartContentGrowthSpectrum,
  fetchChartCoreEngagementIndex,
};
