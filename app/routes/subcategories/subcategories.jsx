import { useEffect, useState } from "react";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./subcategories.module.css";
import EmptyCard from "../../components/shared/EmptyCard/EmptyCard";
import Breadcrumb from "../../components/shared/Breadcrumb/Breadcrumb";
import { useMatches } from "react-router";
import { protectedRouteMiddleware } from "../../middleware/protectedRoute.server";
import Modal from "../../components/ui/Modal/Modal";
import FormContainer from "../../components/ui/FormContainer/FormContainer";
import TextInput from "../../components/ui/TextInput/TextInput";
import SelectInput from "../../components/ui/SelectInput/SelectInput";
import BottomMenu from "../../components/shared/BottomMenu/BottomMenu";
import PageTitle from "../../components/ui/PageTitle/PageTitle";

export const handle = {
  title: "Subcategories",
  breadcrumb: ["categories", "subcategories"],
};

export const middleware = [protectedRouteMiddleware];

export async function loader({ request, context, params }) {
  const {
    createSubCategories,
    deleteSubCategories,
    getCategories,
    getSubCategories,
    getSubCategoriesById,
    updateSubCategories,
  } = await import("../../services/api.server");
  const { createBreadcrumb } = await import(
    "../../helpers/breadcrumbHelper.server"
  );
  const breadcrumbs = createBreadcrumb(params);
  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);

  const categorylist = await getCategories(userData?.userData?.token);
  const list = await getSubCategoriesById(
    userData?.userData?.token,
    params?.catid
  );

  const url = new URL(request.url);
  return { list, categorylist, pathname: url?.pathname,breadcrumbs };
}

export async function action({ request, context, params }) {
  const {
    createSubCategories,
    deleteSubCategories,
    getCategories,
    getSubCategories,
    getSubCategoriesById,
    updateSubCategories,
  } = await import("../../services/api.server");
  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let res = null;

  switch (data?.action) {
    case "add":
      res = await createSubCategories({
        token: userData?.userData?.token,
        name: data?.name,
        categoryid: parseInt(params?.catid),
      });
      break;
    case "update":
      res = await updateSubCategories({
        token: userData?.userData?.token,
        name: data?.name,
        id: data?.id,
        categoryid: parseInt(params?.catid),
      });
      break;
    case "delete":
      res = await deleteSubCategories({
        token: userData?.userData?.token,
        id: data?.id,
      });
      break;
  }

  return { res };
}

export default function SubCategoriesPage({ loaderData, actionData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formMode, setFormMode] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [actionError, setActionError] = useState();
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (actionData?.res?.success) {
      setIsOpen(false);
      setFormMode(null);
      setSelectedData(null);
    } else {
      setActionError(actionData?.res?.message);
      setFormError(actionData?.res?.errors);
    }
  }, [actionData]);

  const closeModal = () => {
    setIsOpen(false);
    setFormMode(null);
    setIsOpen(false);
    setActionError(null);
    setFormError(null);
  };

  const showAddForm = (data) => {
    setFormMode("add");
    setIsOpen(true);
  };

  const showEditForm = (data) => {
    setSelectedData(data);
    setFormMode("update");
    setIsOpen(true);
  };

  const showDeleteForm = (data) => {
    setSelectedData(data);
    setFormMode("delete");
    setIsOpen(true);
  };

  return (
    <div className="page">
      <Navbar title="Subcategories" openButton={showAddForm} />
      <Breadcrumb data={loaderData?.breadcrumbs} />
      <PageTitle value={loaderData?.list?.data?.name} />
      <div className="container">
        {loaderData?.list?.data?.data?.length > 0 ? (
          loaderData?.list?.data?.data?.map((c) => (
            <CategoryCard
              key={c.id}
              data={c}
              name={c.name}
              parentId={1}
              type={"subcategory"}
              level={3}
              xp={500}
              nextxp={1500}
              logs={21}
              subcount={3}
              activitycount={21}
              openLink={`${loaderData?.pathname}/${c.id}/activities`}
              onEdit={() => {
                showEditForm(c);
              }}
              onDelete={() => {
                showDeleteForm(c);
              }}
            />
          ))
        ) : (
          <EmptyCard />
        )}

        <Modal isOpen={isOpen && formMode} close={closeModal}>
          {formMode == "add" && (
            <FormContainer
              title="New Subcategory"
              method="post"
              error={actionError}
              close={closeModal}
            >
              <input type="hidden" name="action" value="add" />
              <TextInput
                name="name"
                label="name"
                placeholder="Health & Fitness"
                error={formError?.name}
                autocomplete="off"
              />
            </FormContainer>
          )}
          {formMode == "update" && (
            <FormContainer
              title="Edit Subcategory"
              method="post"
              error={actionError}
              close={closeModal}
            >
              {selectedData?.id && (
                <input type="hidden" name="id" value={selectedData?.id} />
              )}
              <input type="hidden" name="action" value="update" />
              <SelectInput
                key={selectedData?.categoryid}
                label="category"
                name="categoryid"
                defaultValue={selectedData?.categoryid}
                error={formError?.categoryid}
                data={loaderData?.categorylist?.data}
              />
              <TextInput
                name="name"
                label="name"
                defaultValue={selectedData?.name}
                placeholder="Health & Fitness"
                error={formError?.name}
                autocomplete="off"
              />
            </FormContainer>
          )}
          {formMode == "delete" && (
            <FormContainer
              title="Delete Category"
              method="post"
              error={actionError}
              close={closeModal}
              cancelClose={true}
            >
              <span>Are you sure to delete?</span>
              <input type="hidden" name="action" value="delete" />
              {selectedData?.id && (
                <input type="hidden" name="id" value={selectedData?.id} />
              )}
            </FormContainer>
          )}
        </Modal>
      </div>
      <BottomMenu/>
    </div>
  );
}
