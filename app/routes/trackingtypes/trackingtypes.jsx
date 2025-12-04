import { useMatches } from "react-router";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import EmptyCard from "../../components/shared/EmptyCard/EmptyCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./trackingtypes.module.css";
import Breadcrumb from "../../components/shared/Breadcrumb/Breadcrumb";
import { protectedRouteMiddleware } from "../../middleware/protectedRoute.server";
import { createTrackingTypes, deleteTrackingTypes, getTrackingTypes, updateTrackingTypes } from "../../services/api.server";
import { useState } from "react";
import Modal from "../../components/ui/Modal/Modal";
import FormContainer from "../../components/ui/FormContainer/FormContainer";
import TextInput from "../../components/ui/TextInput/TextInput";

export const handle = {
  title: "Tracking Types",
  breadcrumb: ["trackingtypes"],
};
export const middleware = [protectedRouteMiddleware];

export async function loader({ context }) {
  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);

  const list = await getTrackingTypes(userData?.userData?.token);

  return { list };
}

export async function action({ request, context }) {
  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let res = null;

  switch (data?.action) {
    case "add":
      res = await createTrackingTypes({token:userData?.userData?.token,name:data?.name})
      break;
    case "update":
      res = await updateTrackingTypes({token:userData?.userData?.token,name:data?.name,id:data?.id})
      break;
    case "delete":
      res = await deleteTrackingTypes({token:userData?.userData?.token,id:data?.id})
      break;
  }
  return { res };
}

export default function TrackingTypesPage({ loaderData, actionData }) {
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
  return (
    <div>
      <Navbar title="Tracking Types" openButton={showAddForm} />
            <Wrapper>
              <Breadcrumb data={breadcrumb} />
              {loaderData?.list?.data?.length > 0 ? (
                loaderData?.list?.data?.map((c) => (
                  <CategoryCard
                    key={c.id}
                    name={c.name}
                    parentId={c.categoryId}
                    type={"trackingtype"}
                    level={3}
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
                    title="New Tracking Type"
                    method="post"
                    error={actionData?.result?.message}
                    close={closeModal}
                  >
                    <input type="hidden" name="action" value="add" />
                    <TextInput
                      name="name"
                      label="tracking type name"
                      placeholder="hour,kilometer,day etc."
                      autocomplete="off"
                    />
                  </FormContainer>
                )}
                {formMode == "update" && (
                  <FormContainer
                    title="Edit Tracking Type"
                    method="post"
                    error={actionData?.result?.message}
                    close={closeModal}
                  >
                    {selectedData?.id && (
                      <input type="hidden" name="id" value={selectedData?.id} />
                    )}
                    <input type="hidden" name="action" value="update" />
                    <TextInput
                      name="name"
                      label="tracking type name"
                      defaultValue={selectedData?.name}
                      placeholder="hour,kilometer,day etc."
                      autocomplete="off"
                    />
                  </FormContainer>
                )}
                {formMode == "delete" && (
                  <FormContainer
                    title="Delete Tracking Type"
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
