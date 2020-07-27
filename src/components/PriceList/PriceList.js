import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { efisheryApi } from '../../services';
import { Table } from '../Table';
import { Card } from '../Card';
import { FilterModal } from '../FilterModal';
import { AddFishModal } from '../AddFishModal';
import './pricelist.scss';

export const PriceList = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [totalShow] = useState(20);

  const handleApplyFilter = params => {
    setFilterOpen(false)
    setPage(1);
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

  const handleSubmitSuccess = () => {
    setPage(1);
    setFormOpen(false);
  }

  const { isLoading, error, data: datax } = useQuery(['fishList', { filter }], async (_, { filter: queryFilter }) => {
    const res = await efisheryApi.getFishList(queryFilter);
    return res
  });

  const { data: dataArea } = useQuery('area', async () => {
    const res = await efisheryApi.getArea();
    return res;
  });

  const { data: dataSize } = useQuery('size', async () => {
    const res = await efisheryApi.getSize();
    return res;
  });

  const filteredData = (datax || [])
    .filter(item => !!item.uuid && !!item.timestamp)

  const data = filteredData
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(((page * totalShow) - totalShow), (page * totalShow));

  const totalPage = Math.ceil(filteredData.length / totalShow);

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
        <div className="list-header">
          <div className="list-title">Daftar Harga</div>
          <div className="list-action">
            <button className="pagination-button" onClick={() => setFormOpen(true)}>
              <span class="material-icons">add</span>
            </button>
            <button className="pagination-button" onClick={() => setFilterOpen(true)}>
              <span class="material-icons">search</span>
            </button>
            <button className="pagination-button" onClick={handleResetFilter}>
              <span class="material-icons">refresh</span>
            </button>
          </div>
        </div>
        <div className="table-a">
          {isLoading ? (
            <div className="center-loading">Sedang Memuat ...</div>
          ) : (
            <Table columns={columns} data={data}/>
          )}
        </div>
        <div className="pagination">
          <div className="pagination-content">
            <span>Halaman: {page}/{totalPage}</span>
            <button 
              disabled={isLoading || (page === 1)}
              className="pagination-button"
              onClick={() => setPage(prev => prev - 1)}
            >
              <span class="material-icons">keyboard_arrow_left</span>
            </button>
            <button 
              disabled={isLoading || (page === totalPage)}
              className="pagination-button"
              onClick={() => setPage(prev => prev + 1)}
            >
              <span class="material-icons">keyboard_arrow_right</span>
            </button>
          </div>
        </div>
      </Card>
      {isFilterOpen && (
        <FilterModal
          onClose={() => setFilterOpen(false)}
          onApplyFilter={handleApplyFilter}
          onResetFilter={handleResetFilter}
          dataArea={dataArea}
          dataSize={dataSize}
        />
      )}
      {isFormOpen && (
        <AddFishModal 
          onClose={() => setFormOpen(false)}
          onSubmitSuccess={handleSubmitSuccess}
          dataArea={dataArea}
          dataSize={dataSize}
        />
      )}
    </>
  )
}