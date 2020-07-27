import React, { useMemo } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from '../Modal';
import JsonToForm from 'json-reactform';
import { useMutation, queryCache } from 'react-query';
import { efisheryApi } from '../../services';

export const AddFishModal = ({onSubmitSuccess, onClose, dataArea, dataSize}) => {

  const addFish = ({ payload }) => efisheryApi.addFish([payload]);

  const [ mutate, { isLoading } ] = useMutation(addFish, {
    onSuccess: () => {
      queryCache.invalidateQueries('fishList');
      onSubmitSuccess();
    }
  });

  const handleSubmit = async params => {
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
      <JsonToForm model={model} onSubmit={handleSubmit}/>
    </Modal>
  )
}
