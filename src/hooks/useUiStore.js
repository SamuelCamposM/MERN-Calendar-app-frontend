import { useSelector, useDispatch } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };
  const toggleDateModal = () => {
    isDateModalOpen ? closeDateModal() : openDateModal();
  };
  return {
    //* PROPIEDADES
    isDateModalOpen,
    //* METODOS
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
