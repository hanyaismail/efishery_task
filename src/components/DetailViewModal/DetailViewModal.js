import React from 'react';
import { Modal } from '../Modal';
import './detailviewmodal.scss';

export const DetailViewModal = ({data, onClose}) => {
  return (
    <Modal title="Detail Komoditas" onClose={onClose}>
      <h2>{data.komoditas}</h2>
      <table className="detail-table">
        <tr>
          <td>Provinsi</td>
          <td>{data.area_provinsi}</td>
        </tr>
        <tr>
          <td>Kota</td>
          <td>{data.area_kota}</td>
        </tr>
        <tr>
          <td>Ukuran</td>
          <td>{data.size}</td>
        </tr>
        <tr>
          <td>Harga</td>
          <td>{data.price}</td>
        </tr>
        <tr>
          <td>Tanggal</td>
          <td>{data.tgl_parsed}</td>
        </tr>
      </table>
    </Modal>
  )
}