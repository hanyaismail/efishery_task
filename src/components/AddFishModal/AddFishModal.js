import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import JsonToForm from 'json-reactform';
import { useMutation } from 'react-query';
import { Modal } from '../../uikit/Modal';
import { AlertMessage } from '../../uikit/AlertMessage';
import { efisheryApi } from '../../services';

export const AddFishModal = ({onSubmitSuccess, onClose, dataArea, dataSize}) => {

  const [submitMsg, setSubmitMsg] = useState({
    openMsg: false,
    msgType: null,
    message: null,
  });

  const addFish = ({ payload }) => efisheryApi.addFish([payload]);

  const [ mutate, { isLoading } ] = useMutation(addFish, {
    onSuccess: () => {
      onSubmitSuccess();
      setSubmitMsg({
        openMsg: true,
        msgType: 'success',
        message: 'Submit Data Berhasil',
      });
    },
    onError: () => {
      setSubmitMsg({
        openMsg: true,
        msgType: 'danger',
        message: 'Terjadi Kesalahan Saat Submit Data',
      });
    }
  });

  const handleSubmit = async params => {
    setSubmitMsg({openMsg: false, msgType: null, message: null});
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
      placeholder: "Masukkan nama komoditas",
      required: true,
    },
    Area: {
      type: "select",
      options: (dataArea || []).map(item => ({
        value: item,
        label: `${item.city ? item.city + ', ' : ''}${item.province}`,
      })),
      required: true,
    },
    Ukuran: {
      type: "select",
      options: (dataSize || []).map(({size}) => ({
        value: size,
        label: size,
      })),
      required: true,
    },
    Harga: {
      type: "number",
      placeholder: "Masukkan harga",
      required: true,
    },
    [isLoading ? "Tunggu Sebentar" : "Submit"]: {
      type: "submit",
      disabled: isLoading,
    }
  }), [dataArea, dataSize, isLoading]);

  return (
    <Modal onClose={onClose} title="Tambah Daftar">
      {submitMsg.openMsg && (
        <AlertMessage type={submitMsg.msgType} message={submitMsg.message}/>
      )}
      <JsonToForm model={model} onSubmit={handleSubmit}/>
    </Modal>
  )
}
