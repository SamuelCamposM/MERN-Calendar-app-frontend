import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = ({ texto }) => {
  const { openDateModal } = useUiStore();
  const { onSetActiveEvent } = useCalendarStore();
  const onClickNew = () => {
    onSetActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "yellow",
      user: {
        _id: "123",
        name: "Samuel",
      },
    });
    openDateModal();
  };
  return (
    <button className="btn btn-primary fab" onClick={onClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
