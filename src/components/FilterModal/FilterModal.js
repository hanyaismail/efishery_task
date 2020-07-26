import React, { useMemo } from 'react';
import Modal from 'react-modal';
import JsonToForm from 'json-reactform';
import { useQuery } from 'react-query';

Modal.setAppElement('#root');

export const FilterModal = ({isModalOpen, onApplyFilter, onResetFilter, onClose}) => {

  const { isLoading: loadingArea, data: dataArea } = useQuery('area', () => {
    return fetch('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area').then(res =>
      res.json()
    )
  });

  const { isLoading: loadingSize, data: dataSize } = useQuery('size', () => {
    return fetch('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size').then(res =>
      res.json()
    )
  });

  const model = useMemo(()=> ({
    Komoditas: {
      type: "text",
    },
    Area: {
      type: "select",
      options: (dataArea || []).map(item => ({
        value: item,
        label: `${item.city ? item.city + ', ' : ''}${item.province}`,
      })),
    },
    Ukuran: {
      type: "select",
      options: (dataSize || []).map(({size}) => ({
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
      <button onClick={onResetFilter}>Reset</button>
    </Modal>
  )
}
