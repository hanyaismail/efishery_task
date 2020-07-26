import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { efisheryApi } from '../../services';
import { Table } from '../Table';
import { Card } from '../Card';
import { FilterModal } from '../FilterModal';
import { AddFishModal } from '../AddFishModal';
import './pricelist.scss';

// const getMockup = (length) => {
//   let data = [];
//   for ()
// }

export const PriceList = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);

  const handleApplyFilter = params => {
    setFilterOpen(false)
    setFilter({
      komoditas: params["Komoditas"] || undefined,
      area_provinsi: params["Area"] ? params["Area"].value.province : undefined,
      area_kota: params["Area"] && params["Area"].value.city ? params["Area"].value.city : undefined,
      size: params["Ukuran"] ? params["Ukuran"].value : undefined,
      price: params["Harga"] || undefined,
    })
  }

  const handleResetFilter = () => {
    setFilterOpen(false)
    setFilter(null)
  }

  const { isLoading, error, data: datax } = useQuery(['fishList', { filter }], async (_, { filter: queryFilter }) => {
    const res = await efisheryApi.getFishList(queryFilter);
    return res
  });

  const { data: dataArea } = useQuery('area', async () => {
    console.log('tembak')
    const res = await efisheryApi.getArea();
    return res;
  });

  const { data: dataSize } = useQuery('size', async () => {
    const res = await efisheryApi.getSize();
    return res;
  });

  // const datax = [
  //   {
  //     uuid: "dfadf",
  //     komoditas: "Krapu",
  //     area_provinsi: "DKI",
  //     area_kota: "DKI",
  //     timestamp: 123,
  //   },
  // ];
  // const dataArea = [];
  // const dataSize = [];
  // const isLoading = false;

  const data = (datax || [])
    .filter(item => !!item.uuid && !!item.timestamp)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(((page * 20) - 20), (page * 20));

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
    <>
      <Card>
        <div className="">
          <div>Daftar Harga</div>
          <button onClick={() => setFormOpen(true)}>Tambah Data</button>
          <button onClick={() => setFilterOpen(true)}>Filter</button>
          <button onClick={handleResetFilter}>Reset Filter</button>
        </div>
        <div className="table">
          {isLoading ? "Sedang Memuat ..." : (
            <Table columns={columns} data={data}/>
          )}
        </div>
        <div className="pagination">
          <span onClick={() => setPage(prev => prev - 1)}>Prev</span>
          <span>{page}</span>
          <span onClick={() => setPage(prev => prev + 1)}>Next</span>
        </div>
      </Card>
      <FilterModal
        onClose={() => setFilterOpen(false)}
        isModalOpen={isFilterOpen}
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
        dataArea={dataArea}
        dataSize={dataSize}
      />
      <AddFishModal 
        onClose={() => setFormOpen(false)}
        isModalOpen={isFormOpen}
        onSubmitSuccess={() => setFormOpen(false)}
        dataArea={dataArea}
        dataSize={dataSize}
      />
    </>
  )
}