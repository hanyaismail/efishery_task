import React, { useState } from 'react';
import Modal from 'react-modal';
import { useQuery } from 'react-query';
import { Table } from '../Table';
import { Card } from '../Card';
import { FilterModal } from '../FilterModal';

export const PriceList = () => {

  const [isFilterOpen, setFilterOpen] = useState(false);

  const [filter, setFilter] = useState(null);

  const handleApplyFilter = params => {
    console.log(params)
    setFilterOpen(false)
    setFilter({
      komoditas: params["Komoditas"] || undefined,
      area_provinsi: params["Area"] ? params["Area"].value.province : undefined,
      area_kota: params["Area"] ? params["Area"].value.city : undefined,
      size: params["Ukuran"] ? params["Ukuran"].value : undefined,
      price: params["Harga"] || undefined,
    })
  }

  const handleResetFilter = () => {
    setFilterOpen(false)
    setFilter(null)
  }

  const { isLoading, error, data: datax } = useQuery(['repoData', { filter }], (key, { filter: queryFilter }) => {
    console.log("refetch", queryFilter)
    let search = '';
    if (queryFilter) {
      search = `search=${JSON.stringify(queryFilter)}`
    }

    return fetch(`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list?${search}`).then(res =>
      res.json()
    )
  }
  );

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
    <div>
      <Card>
        
        <div>Daftar Harga</div>
        <button onClick={() => setFilterOpen(true)}>Filter</button>
        {isLoading ? "Sedang Memuat ..." : (
          <Table columns={columns} data={data}/>
        )}
      </Card>
      <FilterModal
        onClose={() => setFilterOpen(false)}
        isModalOpen={isFilterOpen}
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
      />
    </div>
  )
}