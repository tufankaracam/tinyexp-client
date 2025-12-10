export const createBreadcrumb = (params)=>{
    const breadcrumbs = [{ name: "categories", url: "/categories" }];

  if (params?.catid) {
    breadcrumbs.push({
      name: "subcategories",
      url: `/categories/${params?.catid}/subcategories`,
    });
  }
  if (params?.subcatid) {
    breadcrumbs.push({
      name: "activities",
      url: `/categories/${params?.catid}/subcategories/${params?.subcatid}/activities`,
    });
  }
  if (params?.activityid) {
    breadcrumbs.push({
      name: "logs",
      url: `/categories/${params?.catid}/subcategories/${params?.subcatid}/activities/${params?.activityid}/logs`,
    });
  }

  return breadcrumbs;
}