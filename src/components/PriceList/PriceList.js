import React, { useState } from 'react';
import { useQuery, queryCache } from 'react-query';
import { thousandsSeparators } from '../../utils';
import { efisheryApi } from '../../services';
import { Table } from '../../uikit/Table';
import { Card } from '../../uikit/Card';
import { Pagination } from '../../uikit/Pagination';
import { DetailViewModal } from '../DetailViewModal';
import { FilterModal } from '../FilterModal';
import { AddFishModal } from '../AddFishModal';
import { PriceListHeader } from '../PriceListHeader';
import './pricelist.scss';

export const PriceList = () => {
  const [detailView, setDetailView] = useState({modalOpen: false, data: null});
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [totalShow] = useState(20);

  const handleRowClick = (data) => {
    setDetailView({modalOpen: true, data});
  }

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
    queryCache.invalidateQueries('fishList');
  }

  const { isLoading,  data: datax, isError } = useQuery(['fishList', { filter }], async (_, { filter: queryFilter }) => {
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
      Cell: ({ cell: { value } }) => value || '-',
    },
    {
      Header: "Kota",
      accessor: "area_kota",
      Cell: ({ cell: { value } }) => value || '-',
    },
    {
      Header: "Ukuran",
      accessor: "size",
      Cell: ({ cell: { value } }) => value || '-',
    },
    {
      Header: "Harga",
      accessor: "price",
      Cell: ({ cell: { value } }) => value && thousandsSeparators(value),
    },
    {
      Header: "Tanggal",
      accessor: "tgl_parsed",
      Cell: ({ cell: { value } }) => value || '-',
    },
  ]

  return (
    <>
      <Card>
        <div className="wrapper">
          <div className="list-header">
            <PriceListHeader
              onAdd={() => setFormOpen(true)}
              onSearch={() => setFilterOpen(true)}
              onReset={handleResetFilter}
            />
          </div>
          <div className="table-a">
            <Table
              columns={columns}
              data={data}
              onRowClick={handleRowClick}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
          <div className="pagination-content">
            <Pagination
              onNext={() => setPage(prev => prev + 1)}
              onPrev={() => setPage(prev => prev - 1)}
              totalPage={totalPage}
              currentPage={page}
              disabledNext={isLoading}
              disabledPrev={isLoading}
            />
          </div>
        </div>
      </Card>
      {detailView.modalOpen && (
        <DetailViewModal
          onClose={() => setDetailView({modalOpen: false, data: null})}
          data={detailView.data}
        />
      )}
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