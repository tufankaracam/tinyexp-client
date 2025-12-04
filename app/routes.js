import { index, layout, route } from "@react-router/dev/routes";
export default [
  layout("layouts/MainLayout/MainLayout.jsx", [
    index("routes/dashboard/dashboard.jsx"),
    route("/categories", "routes/categories/categories.jsx"),
    route(
      "/categories/:catid/subcategories",
      "routes/subcategories/subcategories.jsx"
    ),
    route(
      "/categories/:catid/subcategories/:subcatid/activities",
      "routes/activities/activities.jsx"
    ),
    route(
      "/categories/:catid/subcategories/:subcatid/activities/:activityid/activitylogs",
      "routes/activitylogs/activitylogs.jsx"
    ),
    route("/trackingtypes", "routes/trackingtypes/trackingtypes.jsx"),
    route("/profile", "routes/profile/profile.jsx"),
  ]),
  layout("layouts/AuthLayout/AuthLayout.jsx", [
    route("/login", "routes/login/login.jsx"),
    route("/register", "routes/register/register.jsx"),
  ]),
];
