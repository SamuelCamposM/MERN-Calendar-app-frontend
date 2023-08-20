import { addHours, differenceInSeconds } from "date-fns";
import { useState, useMemo, useEffect } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";

registerLocale("es", es);
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, onStartSaveEvent } = useCalendarStore();
  const [formSubmited, setformSubmited] = useState(false);
  const [formValues, setformValues] = useState({
    title: "Samuel",
    notes: "Campos",
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  const titleClass = useMemo(() => {
    if (!formSubmited) return "";
    return formValues.title.trim().length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmited]);
  const onInputChange = ({ target }) => {
    setformValues({ ...formValues, [target.name]: target.value });
  };

  const onDateChange = (value, changing) => {
    setformValues({
      ...formValues,
      [changing]: value,
    });
  };
  const onCloseModal = () => {
    closeDateModal();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setformSubmited(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      return Swal.fire(
        "Fechas Incorrectas",
        "Revisar las fechas ingresadas",
        "error"
      );
    }
    if (formValues.title.trim().length === 0) return;
    // TODO
    await onStartSaveEvent(formValues);
    closeDateModal();
    setformSubmited(false)
  };
  useEffect(() => {
    if (activeEvent !== null) { 
      setformValues({ ...activeEvent });
    }
  }, [activeEvent]);

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label style={{ display: "block" }}>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(value) => onDateChange(value, "start")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label style={{ display: "block" }}>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(value) => onDateChange(value, "end")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
