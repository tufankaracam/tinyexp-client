import { useMatches } from "react-router";
import ActivityLogCard from "../../components/features/activitylogs/ActivityLogCard/ActivityLogCard";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import Breadcrumb from "../../components/shared/Breadcrumb/Breadcrumb";
import EmptyCard from "../../components/shared/EmptyCard/EmptyCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./activitylogs.module.css";
import { protectedRouteMiddleware } from "../../middleware/protectedRoute.server";
import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal/Modal";
import FormContainer from "../../components/ui/FormContainer/FormContainer";
import SelectInput from "../../components/ui/SelectInput/SelectInput";
import TextInput from "../../components/ui/TextInput/TextInput";
import NumberInput from "../../components/ui/NumberInput/NumberInput";
import TextAreaInput from "../../components/ui/TextAreaInput/TextAreaInput";
import DateInput from "../../components/ui/DateInput/DateInput";
import dayjs from "dayjs";
import {
  formatUtcToLocalDateTime,
  formatUtcToUtcInput,
} from "../../helpers/dateHelper";
import BottomMenu from "../../components/shared/BottomMenu/BottomMenu";
import TitleText from "../../components/ui/TitleText/TitleText";
import PageTitle from "../../components/ui/PageTitle/PageTitle";

export const handle = {
  title: "Activity Logs",
  breadcrumb: ["categories", "subcategories", "activities", "logs"],
};

export const middleware = [protectedRouteMiddleware];

export async function loader({ request, context, params }) {
  const {
    createActivityLogs,
    deleteActivityLogs,
    getActivityLogsById,
    updateActivityLogs,
  } = await import("../../services/api.server");

  const { createBreadcrumb } = await import(
    "../../helpers/breadcrumbHelper.server"
  );
  const breadcrumbs = createBreadcrumb(params);
  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);

  const list = await getActivityLogsById(
    userData?.userData?.token,
    params?.activityid
  );

  const url = new URL(request.url);
  return { list, pathname: url?.pathname, breadcrumbs };
}

export async function action({ request, context, params }) {
  const { createActivityLogs, updateActivityLogs, deleteActivityLogs } =
    await import("../../services/api.server");
  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let res = null;

  switch (data?.action) {
    case "add":
      res = await createActivityLogs({
        token: userData?.userData?.token,
        activityid: parseInt(params?.activityid),
        activityvalue: parseInt(data?.activityvalue),
        activitydatetime: data?.activitydatetime,
        activitynote: data?.activitynote,
      });
      break;
    case "update":
      res = await updateActivityLogs({
        token: userData?.userData?.token,
        id: data?.id,
        activityid: parseInt(params?.activityid),
        activityvalue: parseInt(data?.activityvalue),
        activitydatetime: data?.activitydatetime,
        activitynote: data?.activitynote,
      });
      break;
    case "delete":
      res = await deleteActivityLogs({
        token: userData?.userData?.token,
        id: data?.id,
      });
      break;
  }
  return { res };
}

export default function ActivityLogsPage({ loaderData, actionData }) {
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
      <Navbar title="Activity Logs" openButton={showAddForm} />
      <Breadcrumb data={loaderData?.breadcrumbs} />
      <PageTitle
        value={loaderData?.list?.data?.name}
        subvalue={loaderData?.list?.data?.trackingtypename}
      />
      <div className="container">
        {loaderData?.list?.data?.data?.length > 0 ? (
          loaderData?.list?.data?.data?.map((c) => (
            <ActivityLogCard
              key={c.id}
              activityname={c.activityname}
              activityvalue={c.activityvalue}
              activitydate={c.activitydatetime}
              activityexp={c.activityexp}
              activitynote={c.activitynote}
              trackingtype={""}
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
              title="New Activity Log"
              method="post"
              error={actionError}
              close={closeModal}
            >
              <input type="hidden" name="action" value="add" />

              <NumberInput
                name="activityvalue"
                error={formError?.activityvalue}
                label="Value"
                placeholder="Enter value which you completed"
                autocomplete="off"
              />
              <DateInput
                name="activitydatetime"
                error={formError?.activitydatetime}
                label="Date Time"
                placeholder="Minimum value to count min job done by tracking unit"
                autocomplete="off"
              />
              <TextAreaInput
                name="activitynote"
                label="note"
                placeholder="Write here notes, later you come and check them. It helps you see difference."
                autocomplete="off"
              />
            </FormContainer>
          )}
          {formMode == "update" && (
            <FormContainer
              title="Edit Activity Log"
              method="post"
              error={actionError}
              close={closeModal}
            >
              {selectedData?.id && (
                <input type="hidden" name="id" value={selectedData?.id} />
              )}
              <input type="hidden" name="action" value="update" />
              <NumberInput
                name="activityvalue"
                error={formError?.activityvalue}
                label="Value"
                placeholder="Enter value which you completed"
                defaultValue={selectedData?.activityvalue}
                autocomplete="off"
              />
              <DateInput
                name="activitydatetime"
                error={formError?.activitydatetime}
                label="Date Time"
                placeholder="Minimum value to count min job done by tracking unit"
                defaultValue={selectedData?.activitydatetime}
                autocomplete="off"
              />
              <TextAreaInput
                name="activitynote"
                label="note"
                placeholder="Write here notes, later you come and check them. It helps you see difference."
                defaultValue={selectedData?.activitynote}
                autocomplete="off"
              />
            </FormContainer>
          )}
          {formMode == "delete" && (
            <FormContainer
              title="Delete Activity Log"
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
      <BottomMenu />
    </div>
  );
}
