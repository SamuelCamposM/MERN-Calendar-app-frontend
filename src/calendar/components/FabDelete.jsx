import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { onStartDeleteEvent, hasEventSelected } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();
  const onClickNew = () => {
    onStartDeleteEvent();
  };
  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={onClickNew}
      style={{ display: hasEventSelected && !isDateModalOpen ? "" : "none" }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
