import { useEffect, useState } from "react";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./categories.module.css";
import EmptyCard from "../../components/shared/EmptyCard/EmptyCard";
import Breadcrumb from "../../components/shared/Breadcrumb/Breadcrumb";
import { useMatches } from "react-router";
import Modal from "../../components/ui/Modal/Modal";
import Card from "../../components/ui/Card/Card";
import FormContainer from "../../components/ui/FormContainer/FormContainer";
import TextInput from "../../components/ui/TextInput/TextInput";
import { protectedRouteMiddleware } from "../../middleware/protectedRoute.server";
import { createCategories, deleteCategories, getCategories, updateCategories } from "../../services/api.server";

export const handle = {
  title: "Categories",
  breadcrumb: ["categories"],
};

export const middleware = [protectedRouteMiddleware];

export async function loader({ context }) {
  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);

  const list = await getCategories(userData?.userData?.token);
  return { list };
}

export async function action({ request, context }) {
  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let res = null;;

  switch (data?.action) {
    case "add":
      res = await createCategories({token:userData?.userData?.token,name:data?.name})
      break;
    case "update":
      res = await updateCategories({token:userData?.userData?.token,name:data?.name,id:data?.id})
      break;
    case "delete":
      res = await deleteCategories({token:userData?.userData?.token,id:data?.id})
      break;
  }

  return { res };
}

export default function CategoriesPage({ loaderData, actionData }) {
  console.log(actionData?.res?.success != true)
  const matches = useMatches();
  const breadcrumb = matches[matches.length - 1]?.handle?.breadcrumb;
  const [isOpen, setIsOpen] = useState(actionData?.res?.success != true);
  const [formMode, setFormMode] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [actionError,setActionError] = useState(null);
  const [formError,setFormError] = useState(null);


  useEffect(() => {
    if (actionData?.res?.success) {
      setIsOpen(false);
      setFormMode(null);
      setSelectedData(null);
    }
    else{
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
    <div>
      <Navbar title="Categories" openButton={showAddForm} />
      <Wrapper>
        <Breadcrumb data={breadcrumb} />
        {loaderData?.list?.data?.length > 0 ? (
          loaderData?.list?.data?.map((c) => (
            <CategoryCard
              key={c.id}
              data={c}
              name={c.name}
              parentId={c.categoryId}
              type={"category"}
              level={3}
              xp={500}
              nextxp={1500}
              logs={21}
              subcount={3}
              activitycount={21}
              openLink={`/categories/${c.id}/subcategories`}
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
              title="New Category"
              action="/categories"
              method="post"
              error={actionError}
              close={closeModal}
            >
              <input type="hidden" name="action" value="add" />
              <TextInput
                name="name"
                label="category name"
                placeholder="Health & Fitness"
                error={formError?.name}
                autocomplete="off"
              />
            </FormContainer>
          )}
          {formMode == "update" && (
            <FormContainer
              title="Edit Category"
              action="/categories"
              method="post"
              error={actionError}
              close={closeModal}
            >
              {selectedData?.id && (
                <input type="hidden" name="id" value={selectedData?.id} />
              )}
              <input type="hidden" name="action" value="update" />
              <TextInput
                name="name"
                label="category name"
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
              action="/categories"
              method="post"
              cancelClose={true}
              error={actionError}
              close={closeModal}
            >
              <span>Are you sure to delete?</span>
              <input type="hidden" name="action" value="delete" />
              {selectedData?.id && (
                <input type="hidden" name="id" value={selectedData?.id} />
              )}
            </FormContainer>
          )}
        </Modal>
      </Wrapper>
    </div>
  );
}
