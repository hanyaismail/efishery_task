import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import JsonToForm from 'json-reactform';
import { useMutation, queryCache } from 'react-query';
import { Modal } from '../../uikit/Modal';
import { AlertMessage } from '../../uikit/AlertMessage';
import { efisheryApi } from '../../services';

export const AddFishModal = ({onSubmitSuccess, onClose, dataArea, dataSize}) => {

  const [isSubmitError, setSubmitError] = useState(false);

  const addFish = ({ payload }) => efisheryApi.addFish([payload]);

  const [ mutate, { isLoading } ] = useMutation(addFish, {
    onSuccess: () => {
      queryCache.invalidateQueries('fishList');
      onSubmitSuccess();
    },
    onError: () => {
      setSubmitError(true);
    }
  });

  const handleSubmit = async params => {
    setSubmitError(false);
    const payload = {
      uuid: uuidv4(),
      komoditas: params.Komoditas,
      area_provinsi: params.Area.value.province,
      area_kota: params.Area.value.city,
      size: params.Ukuran.value,
      price: params.Harga,
      tgl_parsed: moment().format(),
      timestamp: moment().valueOf(),
    }

    await mutate({ payload });
  }

  const model = useMemo(()=> ({
    Komoditas: {
      type: "text",
      required: true,
    },
    Area: {
      type: "select",
      options: (dataArea || [{ value: 'loading', label: 'Loading...' }]).map(item => ({
        value: item,
        label: `${item.city ? item.city + ', ' : ''}${item.province}`,
      })),
      required: true,
    },
    Ukuran: {
      type: "select",
      options: (dataSize || [{ value: 'loading', label: 'Loading...' }]).map(({size}) => ({
        value: size,
        label: size,
      })),
      required: true,
    },
    Harga: {
      type: "number",
      required: true,
    },
    [isLoading ? "Tunggu Sebentar" : "Submit"]: {
      type: "submit",
      disabled: isLoading,
    }
  }), [dataArea, dataSize, isLoading]);

  return (
    <Modal onClose={onClose} title="Tambah Daftar">
      {isSubmitError && (
        <AlertMessage message="Terjadi Error Saat Submit Data"/>
      )}
      <JsonToForm model={model} onSubmit={handleSubmit}/>
    </Modal>
  )
}
