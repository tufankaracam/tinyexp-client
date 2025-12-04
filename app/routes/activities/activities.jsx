import { useEffect, useState } from "react";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./activities.module.css";
import EmptyCard from "../../components/shared/EmptyCard/EmptyCard";
import Breadcrumb from "../../components/shared/Breadcrumb/Breadcrumb";
import { useMatch, useMatches, useNavigate } from "react-router";
import { protectedRouteMiddleware } from "../../middleware/protectedRoute.server";

import Modal from "../../components/ui/Modal/Modal";
import FormContainer from "../../components/ui/FormContainer/FormContainer";
import TextInput from "../../components/ui/TextInput/TextInput";
import SelectInput from "../../components/ui/SelectInput/SelectInput";
import NumberInput from "../../components/ui/NumberInput/NumberInput";
import TrackingTypeAddButton from "../../components/shared/TrackingTypeAddButton/TrackingTypeAddButton";
import OpenButton from "../../components/shared/OpenButton/OpenButton";

export const handle = {
  title: "Activities",
  breadcrumb: ["categories", "subcategories", "activities"],
};

export const middleware = [protectedRouteMiddleware];

export async function loader({ request, context, params }) {

  const {
  createActivities,
  deleteActivities,
  getActivitiesById,
  getCategories,
  getSubCategoriesById,
  getTrackingTypes,
  updateActivities,
} = await import("../../services/api.server");

  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);

  const categoryList = await getCategories(userData?.userData?.token);
  const trackingTypeList = await getTrackingTypes(userData?.userData?.token);
  const subCategoryList = await getSubCategoriesById(
    userData?.userData?.token,
    params?.catid
  );

  const list = await getActivitiesById(
    userData?.userData?.token,
    params?.subcatid
  );
  //console.log(list?.data?.data)

  const url = new URL(request.url);
  //console.log({list, categoryList, subCategoryList,trackingTypeList, pathname: url?.pathname})
  return { list, categoryList, subCategoryList,trackingTypeList, pathname: url?.pathname };
}

export async function action({ request, context, params }) {
  const {
    createActivities,
    deleteActivities,
    updateActivities,
  } = await import("../../services/api.server");
  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let res = null;
  console.log(data);

  switch (data?.action) {
    case "add":
      res = await createActivities({
        token: userData?.userData?.token,
        name: data?.name,
        subcategoryid: parseInt(params?.subcatid),
        trackingtypeid:parseInt(data?.trackingtypeid),
        minvalue:parseInt(data?.minvalue)
      });
      break;
    case "update":
      res = await updateActivities({
        token: userData?.userData?.token,
        name: data?.name,
        id: data?.id,
        subcategoryid: parseInt(data?.subcategoryid),
        trackingtypeid:parseInt(data?.trackingtypeid),
        minvalue:parseInt(data?.minvalue)
      });
      break;
    case "delete":
      res = await deleteActivities({
        token: userData?.userData?.token,
        id: data?.id,
      });
      break;
  }

  return { res };
}


export default function ActivitiesPage({ loaderData, actionData }) {
  const matches = useMatches();
  const breadcrumb = matches[matches.length - 1]?.handle?.breadcrumb;
  const [isOpen, setIsOpen] = useState(false);
  const [formMode, setFormMode] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(selectedData)
  },[selectedData])

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
      name: "Kitap Okuma",
      type: "activity",
      level: 3,
      xp: 500,
      logs: 21,
      nextxp: 1500,
      trackingtype: "Sayfa",
      value: 500,
    },
    {
      id: 2,
      name: "Gunluk Kosu",
      type: "activity",
      level: 5,
      xp: 750,
      logs: 21,
      nextxp: 1000,
      trackingtype: "Sayfa",
      value: 500,
    },
    {
      id: 3,
      name: "Full Body Antrenman",
      type: "activity",
      level: 7,
      xp: 9500,
      logs: 15,
      nextxp: 12500,
      trackingtype: "Set",
      value: 750,
    },
  ]); */
  
  
  return (
    <div>
          <Navbar title="Activities" openButton={showAddForm} />
          <Wrapper>
            <Breadcrumb data={breadcrumb} />
            {loaderData?.list?.data?.data?.length > 0 ? (
              loaderData?.list?.data?.data?.map((c) => (
                <CategoryCard
                  key={c.id}
                  data={c}
                  name={c.name}
                  parentId={1}
                  type={"activity"}
                  level={3}
                  xp={500}
                  nextxp={1500}
                  logs={21}
                  subcount={3}
                  activitycount={21}
                  openLink={`${loaderData?.pathname}/${c.id}/activitylogs`}
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
                  title="New Activity"
                  method="post"
                  error={actionData?.result?.message}
                  close={closeModal}
                >
                  <input type="hidden" name="action" value="add" />
                  
                  <div className={css.forminputgroup}>
                    <SelectInput
                    key={selectedData?.categoryid}
                    label="tracking type"
                    name="trackingtypeid"
                    data={loaderData?.trackingTypeList?.data}
                  />
                  <OpenButton text="Tracking Types" onClick={()=>{navigate('/trackingtypes')}}/>
                  </div>
                  <TextInput
                    name="name"
                    label="name"
                    placeholder="Skill or log name like 'running,reading'"
                    autocomplete="off"
                  />
                  <NumberInput
                    name="minvalue"
                    label="Min Value"
                    placeholder="Minimum value to count min job done by tracking unit"
                    autocomplete="off"
                  />
                </FormContainer>
              )}
              {formMode == "update" && (
                <FormContainer
                  title="Edit Activity"
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
                    label="name"
                    placeholder="Health & Fitness"
                    defaultValue={selectedData?.name}
                    autocomplete="off"
                  />
                  <SelectInput
                    
                    label="subcategory"
                    name="subcategoryid"
                    data={loaderData?.subCategoryList?.data?.data}
                    defaultValue={selectedData?.subcategoryid}
                  />
                  <SelectInput
                    label="tracking type"
                    name="trackingtypeid"
                    data={loaderData?.trackingTypeList?.data}
                    defaultValue={selectedData?.trackingtypeid}
                  />
                  <OpenButton text="Tracking Types" onClick={()=>{navigate('/trackingtypes',{replace:true})}}/>
                  <NumberInput
                    name="minvalue"
                    label="Min Value"
                    placeholder="Minimum value to count min job done by tracking unit"
                    defaultValue={selectedData?.minvalue}
                    autocomplete="off"
                  />
                  
                </FormContainer>
              )}
              {formMode == "delete" && (
                <FormContainer
                  title="Delete Activity"
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
