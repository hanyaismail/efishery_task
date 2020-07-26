import React from 'react';
import { Table } from './Table';
import { Card } from './Card';

const PriceList = () => {
  const data = [
    {
      uuid: "8a23fcab-ef67-48b8-8ba1-7055ea91ea3b",
      komoditas: "Ikan Tunaa",
      area_provinsi: "JAWA TIMUR",
      area_kota: "SURABAYA 1",
      size: "90",
      price: "20000",
      tgl_parsed: "Wed Jun 03 11:32:48 GMT+07:00 2020",
    },
    {
      uuid: "8a23fcab-ef67-48b8-8ba1-7055ea91ea3b",
      komoditas: "Ikan Tunaa",
      area_provinsi: "JAWA TIMUR",
      area_kota: "SURABAYA 1",
      size: "90",
      price: "20000",
      tgl_parsed: "Wed Jun 03 11:32:48 GMT+07:00 2020",
    },
    {
      uuid: "8a23fcab-ef67-48b8-8ba1-7055ea91ea3b",
      komoditas: "Ikan Tunaa",
      area_provinsi: "JAWA TIMUR",
      area_kota: "SURABAYA 1",
      size: "90",
      price: "20000",
      tgl_parsed: "Wed Jun 03 11:32:48 GMT+07:00 2020",
    }
  ];

  const columns = [
    {
      Header: "uuid",
      accessor: "uuid",
    },
    {
      Header: "Komoditas",
      accessor: "komoditas",
    },
    {
      Header: "Provinsi",
      accessor: "area_provinsi",
    },
    {
      Header: "Kota",
      accessor: "area_kota",
    },
    {
      Header: "Ukuran",
      accessor: "size",
    },
    {
      Header: "Harga",
      accessor: "price",
    },
    {
      Header: "Tanggal",
      accessor: "tgl_parsed",
    },
  ]

  return (
    <Card>
      <Table columns={columns} data={data}/>
    </Card>
  )
}

export default PriceList;