import React from 'react';
import { useQuery } from 'react-query';
import { Table } from './Table';
import { Card } from './Card';

const PriceList = () => {

  const { isLoading, error, data: datax } = useQuery('repoData', () =>
    fetch('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list').then(res =>
      res.json()
    )
  );
  console.log(datax)

  const data = (datax || []).filter(item => item.uuid !== null).slice(0, 20);

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