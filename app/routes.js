import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/MainLayout/MainLayout.jsx", [
    index("routes/dashboard/dashboard.jsx"),
    route("/categories", "routes/categories/categories.jsx"),
    route("/subcategories", "routes/subcategories/subcategories.jsx"),
    route("/trackingtypes", "routes/trackingtypes/trackingtypes.jsx"),
    route("/activities", "routes/activities/activities.jsx"),
    route("/activitylogs", "routes/activitylogs/activitylogs.jsx"),
  ]),
  layout("layouts/AuthLayout/AuthLayout.jsx", [
    route("/login", "routes/login/login.jsx"),
    route("/register", "routes/register/register.jsx"),
  ]),
];
