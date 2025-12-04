import { useState } from "react";
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
  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);

  const categorylist = await getCategories(userData?.userData?.token);
  const list = await getSubCategoriesById(
    userData?.userData?.token,
    params?.catid
  );
  console.log(list?.data?.data);
  /*   console.log(list);
  console.log(categorylist); */
  const url = new URL(request.url);
  return { list, categorylist, pathname: url?.pathname };
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
  console.log(data);

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

  console.log(res);
  return { res };
}

export default function SubCategoriesPage({ loaderData, actionData }) {
  const matches = useMatches();
  const breadcrumb = matches[matches.length - 1]?.handle?.breadcrumb;
  const [isOpen, setIsOpen] = useState(false);
  const [formMode, setFormMode] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
    setFormMode(null);
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

  /* const [data, setData] = useState([
    {
      id: 1,
      name: "Aerobik",
      type: "subcategory",
      level: 3,
      xp: 500,
      logs: 21,
      nextxp: 1500,
      subcount: 4,
      activitycount: 7,
    },
    {
      id: 2,
      name: "Gunluk Kosu",
      type: "subcategory",
    },
    {
      id: 3,
      name: "Jimnastik",
      type: "subcategory",
    },
  ]); */
  return (
    <div>
      <Navbar title="Subcategories" openButton={showAddForm} />
      <Wrapper>
        <Breadcrumb data={breadcrumb} />
        {/* {data.map((c) => (
          <CategoryCard
            name={c.name}
            type={c.type}
            level={c.level}
            xp={c.xp}
            nextxp={c.nextxp}
            logs={c.logs}
            activitycount={c.activitycount}
          />
        ))} */}
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
              error={actionData?.result?.message}
              close={closeModal}
            >
              <input type="hidden" name="action" value="add" />
              <TextInput
                name="name"
                label="name"
                placeholder="Health & Fitness"
                autocomplete="off"
              />
            </FormContainer>
          )}
          {formMode == "update" && (
            <FormContainer
              title="Edit Subcategory"
              method="post"
              error={actionData?.result?.message}
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
                data={loaderData?.categorylist?.data}
              />
              <TextInput
                name="name"
                label="name"
                defaultValue={selectedData?.name}
                placeholder="Health & Fitness"
                autocomplete="off"
              />
            </FormContainer>
          )}
          {formMode == "delete" && (
            <FormContainer
              title="Delete Category"
              method="post"
              error={actionData?.result?.message}
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
