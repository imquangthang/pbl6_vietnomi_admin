import {
  HomeIcon,
  UserCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  TagIcon,
  ArrowUpOnSquareIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Accounts from "./pages/dashboard/account";
import Ingredients from "./pages/dashboard/ingredient";
import Tags from "./pages/dashboard/tag";
import Foods from "./pages/dashboard/food";
import Posts from "./pages/dashboard/post";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "account",
        path: "/account",
        element: <Accounts />,
      },
      {
        icon: <TagIcon {...icon} />,
        name: "tag",
        path: "/tag",
        element: <Tags />,
      },
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "food",
        path: "/food",
        element: <Foods />,
      },
      {
        icon: <ArrowUpOnSquareStackIcon {...icon} />,
        name: "post",
        path: "/post",
        element: <Posts />,
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
