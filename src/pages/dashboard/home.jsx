import React, { useEffect, useState, useMemo } from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { Skeleton } from "@mui/material";

import {
  fetchTotalUsers,
  fetchTotalFoods,
  fetchTotalComments,
  fetchTotalRatings,
  fetchChartCustomerVelocity,
  fetchChartContentGrowthSpectrum,
  fetchChartCoreEngagementIndex,
} from "@/services/dashboard.service";

import {
  ChatBubbleLeftIcon,
  ClockIcon,
  Squares2X2Icon,
  StarIcon,
  UsersIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

// --- HÀM HỖ TRỢ ---

const formatFooter = (data, changeType) => {
  // ... (Giữ nguyên logic footer)
  const isIncrease = data.changeDirection === "increase";
  const textColor = isIncrease ? "text-green-500" : "text-red-500";
  const percentageText = `${isIncrease ? "+" : ""}${data.percentageChange}%`;

  let periodText = "";
  switch (changeType) {
    case "daily":
      periodText = "hôm qua";
      break;
    case "weekly":
      periodText = "tuần trước";
      break;
    case "monthly":
      periodText = "tháng trước";
      break;
    default:
      periodText = "giai đoạn trước";
  }

  const StrongComponent = (
    <strong className={textColor}>{percentageText}</strong>
  );

  return (
    <Typography className="font-normal text-blue-gray-600">
      {StrongComponent}
      &nbsp;so với {periodText}
    </Typography>
  );
};

// Hàm cung cấp các options mặc định cho ApexChart
const getChartOptions = (labels, type = "bar") => ({
  chart: {
    type: type,
    toolbar: { show: false },
    height: 220,
  },
  title: { show: false },
  dataLabels: { enabled: false },

  // SỬA ĐỔI QUAN TRỌNG: Đặt màu series thành màu đen
  colors: ["#000000"],

  stroke: {
    lineCap: "round",
    curve: "smooth",
    // Đặt màu line/bar thành đen
    colors: ["#000000"],
  },
  xaxis: {
    axisTicks: { show: false },
    axisBorder: { show: false },
    labels: {
      // Giữ màu xám nhạt cho nhãn
      style: {
        colors: "#B0BEC5",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
    categories: labels,
  },
  yaxis: {
    labels: {
      // Giữ màu xám nhạt cho nhãn
      style: {
        colors: "#B0BEC5",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#E0E0E0",
    strokeDashArray: 5,
    xaxis: { lines: { show: false } },
  },
  fill: {
    // Đặt opacity thấp cho Bar Chart để tạo hiệu ứng thanh
    opacity: type === "bar" ? 0.7 : 1,
  },
  tooltip: { theme: "light" },
});

// HÀM CHUẨN BỊ DỮ LIỆU
const prepareChartData = (apiData, title, description, color, type = "bar") => {
  const validData = apiData.filter((item) => item.count !== undefined);

  if (validData.length === 0) {
    return null;
  }

  const labels = validData.map((item) => item.date || item.weekLabel);
  const data = validData.map((item) => item.count);

  const reversedLabels = [...labels].reverse();
  const reversedData = [...data].reverse();

  const series = [
    {
      name: title,
      data: reversedData,
    },
  ];

  // KHÔNG TRUYỀN MÀU VÀO getChartOptions NỮA VÌ CHÚNG TA DÙNG MÀU ĐEN CỐ ĐỊNH
  const options = getChartOptions(reversedLabels, type);

  return {
    title,
    description,
    // SỬA ĐỔI: Đặt màu nền thẻ thành "white"
    color: "white",
    chart: {
      type: type,
      height: 220,
      series: series,
      options: options,
    },
    footer: `cập nhật vào ${new Date().toLocaleDateString("vi-VN")}`,
  };
};

// --- HOME COMPONENT ---

export function Home() {
  const [loading, setLoading] = useState(true);
  // ... (Giữ nguyên states) ...
  const [totalUser, setTotalUser] = useState(null);
  const [totalFood, setTotalFood] = useState(null);
  const [totalRating, setTotalRating] = useState(null);
  const [totalComment, setTotalComment] = useState(null);

  const [newRatingsData, setNewRatingsData] = useState([]);
  const [newFoodsData, setNewFoodsData] = useState([]);
  const [newUsersData, setNewUsersData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        const [usersRes, foodsRes, ratingsRes, commentsRes] =
          await Promise.allSettled([
            fetchTotalUsers(),
            fetchTotalFoods(),
            fetchTotalRatings(),
            fetchTotalComments(),
          ]);

        if (usersRes.status === "fulfilled" && usersRes.value?.code === 200)
          setTotalUser(usersRes.value.data);
        if (foodsRes.status === "fulfilled" && foodsRes.value?.code === 200)
          setTotalFood(foodsRes.value.data);
        if (ratingsRes.status === "fulfilled" && ratingsRes.value?.code === 200)
          setTotalRating(ratingsRes.value.data);
        if (
          commentsRes.status === "fulfilled" &&
          commentsRes.value?.code === 200
        )
          setTotalComment(commentsRes.value.data);

        const [usersChartRes, foodsChartRes, ratingsChartRes] =
          await Promise.allSettled([
            fetchChartCustomerVelocity(),
            fetchChartContentGrowthSpectrum(),
            fetchChartCoreEngagementIndex(),
          ]);

        if (
          usersChartRes.status === "fulfilled" &&
          usersChartRes.value?.code === 200
        )
          setNewUsersData(usersChartRes.value.data);
        if (
          foodsChartRes.status === "fulfilled" &&
          foodsChartRes.value?.code === 200
        )
          setNewFoodsData(foodsChartRes.value.data);
        if (
          ratingsChartRes.status === "fulfilled" &&
          ratingsChartRes.value?.code === 200
        )
          setNewRatingsData(ratingsChartRes.value.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const statisticsChartsData = useMemo(() => {
    const charts = [
      // Line Chart
      prepareChartData(
        newUsersData,
        "Lượng Người Dùng Mới (7 Ngày)",
        "Số lượng người dùng đăng ký trong 7 ngày gần nhất.",
        "blue",
        "line",
      ),
      // Bar Chart
      prepareChartData(
        newRatingsData,
        "Lượng Đánh Giá Mới (30 Ngày)",
        "Số lượng đánh giá mới trong 30 ngày gần nhất.",
        "red",
        "bar",
      ),
      // Bar Chart
      prepareChartData(
        newFoodsData,
        "Lượng Món Ăn Mới (4 Tuần)",
        "Số lượng món ăn được thêm trong 4 tuần gần nhất.",
        "green",
        "bar",
      ),
    ];
    return charts.filter((chart) => chart !== null);
  }, [newUsersData, newRatingsData, newFoodsData]);

  const cardData = [
    {
      key: "Total Users",
      value: totalUser?.totalUsers || 0,
      title: "Tổng Người Dùng",
      icon: UsersIcon,
      color: "green",
      footer: totalUser ? formatFooter(totalUser, "monthly") : null,
    },
    {
      key: "Total Foods",
      value: totalFood?.totalFoods || 0,
      title: "Tổng Món Ăn",
      icon: Squares2X2Icon,
      color: "orange",
      footer: totalFood ? formatFooter(totalFood, "weekly") : null,
    },
    {
      key: "Total Comments",
      value: totalComment?.totalRatings || 0,
      title: "Tổng Bình Luận",
      icon: ChatBubbleLeftIcon,
      color: "pink",
      footer: totalComment ? formatFooter(totalComment, "daily") : null,
    },
    {
      key: "Total Ratings",
      value: totalRating?.totalRatings || 0,
      title: "Tổng Đánh Giá",
      icon: StarIcon,
      color: "blue",
      footer: totalRating ? formatFooter(totalRating, "daily") : null,
    },
  ];

  return (
    <div className="mt-12">
      {/* --- KHU VỰC THẺ THỐNG KÊ (STATISTICS CARD) --- */}
      <div className="mb-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
        {cardData.map((data) => (
          <div key={data.key}>
            {loading ? (
              <Skeleton
                variant="rectangular"
                height={120}
                className="rounded-xl"
              />
            ) : (
              <StatisticsCard
                key={data.key}
                value={data.value}
                title={data.title}
                icon={React.createElement(data.icon, {
                  className: "w-6 h-6 text-white",
                })}
                color={data.color}
                footer={data.footer}
              />
            )}
          </div>
        ))}
      </div>

      {/* --- KHU VỰC BIỂU ĐỒ (STATISTICS CHART) --- */}
      <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          [...Array(3)].map((_, index) => (
            <div key={index}>
              <Skeleton
                variant="rectangular"
                height={300}
                className="rounded-xl"
              />
            </div>
          ))
        ) : statisticsChartsData.length > 0 ? (
          statisticsChartsData.map((props) => (
            <StatisticsChart
              key={props.title}
              // SỬ DỤNG 'white' ĐỂ LOẠI BỎ MÀU NỀN CỦA CARDHEADER
              color={props.color}
              chart={props.chart}
              title={props.title}
              description={props.description}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon
                    strokeWidth={2}
                    className="h-4 w-4 text-blue-gray-400"
                  />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          ))
        ) : (
          <div className="rounded-xl bg-white p-8 text-center shadow-lg md:col-span-3">
            <Typography variant="h6" color="blue-gray">
              Không có đủ dữ liệu để hiển thị biểu đồ.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
