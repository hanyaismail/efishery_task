import React, { useMemo } from 'react';
import Modal from 'react-modal';
import JsonToForm from 'json-reactform';

Modal.setAppElement('#root');

export const FilterModal = ({isModalOpen, onApplyFilter, onClose, dataArea, dataSize}) => {

  const model = useMemo(()=> ({
    Komoditas: {
      type: "text",
    },
    Area: {
      type: "select",
      options: (dataArea || [{ value: 'loading', label: 'Loading...' }]).map(item => ({
        value: item,
        label: `${item.city ? item.city + ', ' : ''}${item.province}`,
      })),
    },
    Ukuran: {
      type: "select",
      options: (dataSize || [{ value: 'loading', label: 'Loading...' }]).map(({size}) => ({
        value: size,
        label: size,
      })),
    },
    Harga: {
      type: "number",
    },
    "Terapkan Filter": {
      type: "submit",
    }
  }), [dataArea, dataSize]);

  return (
    <Modal isOpen={isModalOpen}>
      <span onClick={onClose}>close</span>
      <JsonToForm model={model} onSubmit={onApplyFilter}/>
    </Modal>
  )
}
