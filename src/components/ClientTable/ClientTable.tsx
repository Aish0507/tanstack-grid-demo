import { useEffect } from 'react';

import { matchSorter } from 'match-sorter';

import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  Row,
} from 'react-table';

import DesktopTable from '../DesktopTable/DesktopTable';
import DefaultColumnFilter from '../Filters/DefaultColumnFilter';

import { getDefaultTablePageSize } from '../DesktopTable/components/DesktopPagination/paginationUtils';

import createActionsColumn, { ACTIONS_COLUMN_ID } from '../Actions/actionsColumnFactory';

import {
  saveFilters,
  saveSortBy,
  getDefaultFilters,
  getDefaultSortBy,
} from '../../utils/tableStateService';

import { i18n } from '../../i18n/i18n';
import { IClientTable } from '../../types';

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

const defaultColumn = {
  // Let's set up our default Filter UI
  Filter: DefaultColumnFilter,
  // When using the useFlexLayout:
  minWidth: 80, // minWidth is only used as a limit for resizing
  width: 150, // width is used for both the flex-basis and flex-grow
  maxWidth: 400, // maxWidth is only used as a limit for resizing
};
const columnHelper = createColumnHelper();
export default function ClientTable({
  tableId,
  columns,
  data,
  order = {},
  language = 'en',
  maxStillMobileBreakpoint = 800,
  loading,
  isStriped,
  actions = [],
  onFiltersChange = () => { },
  // if it is true filters and sortBy will be stored in memory and when you go back to the table its state will be initialized with it
  // it is stored in a const variable thus state dissapears on page reload
  enableTableStatePersistance = false,
  ...props
}: IClientTable<any>) {
  if (!tableId) {
    throw new Error('non-empty and globally unique tableId is required');
  }
  const addNewColumn = () => {
    const newColumn = columnHelper.accessor('action', {
      id: 'actions-column',
      header: 'New Field',
      cell: info => info.getValue(), // Example cell renderer
      footer: () => 'New Footer',
    });

    // Return the new columns array including the new column
    // return [...columns, newColumn];
    return newColumn
  };
  if (actions.length > 0) {
    if (!columns.find((column) => column.id === ACTIONS_COLUMN_ID)) {
      columns.push({
        accessor: '',
        id: 'actions-column',
        Header: 'New Field',
        Cell: info => 'test'
      });
      // columns.push(createActionsColumn(actions, i18n(language)));
      console.log({ columns })
    }
  }

  const filterTypes = {
    // Add a new fuzzyTextFilterFn filter type.
    fuzzyText: fuzzyTextFilterFn,
    // Or, override the default text filter to use
    // "startWith"
    text: (rows: Row<any>[], id: string, filterValue: string) => rows.filter((row) => {
      const rowValue = row.values[id];

      return rowValue !== undefined
        ? String(rowValue)
          .toLowerCase()
          .startsWith(String(filterValue).toLowerCase())
        : true;
    }),
  };

  // const tableProps = useTable(
  //   {
  //     columns,
  //     data,
  //     defaultColumn, // Be sure to pass the defaultColumn option
  //     filterTypes,
  //     autoResetFilters: false,
  //     autoResetSortBy: false,
  //     initialState: {
  //       pageSize: getDefaultTablePageSize(tableId),
  //       sortBy: getDefaultSortBy(tableId, [order]),
  //       filters: getDefaultFilters<TableProps>(tableId, []),
  //     },
  //     disableMultiSort: true,
  //     disableSortRemove: true,
  //     ...props,
  //   },
  //   useResizeColumns,
  //   useFlexLayout,
  //   useFilters,
  //   useGlobalFilter,
  //   useSortBy,
  //   usePagination,
  // );

  // const {
  //   setPageSize,
  //   gotoPage,
  //   rows,
  //   state: {
  //     filters,
  //     sortBy,
  //   },
  // } = tableProps;

  const tableInstance = useReactTable<any>({
    columns,
    data,
    state: {
      pagination: {
        pageSize: getDefaultTablePageSize(tableId),
        pageIndex: 0
      },
      sorting: getDefaultSortBy(tableId, [order]),
      columnFilters: getDefaultFilters<any>(tableId, []),
    },
    manualFiltering: true,
    manualSorting: true,
    enableMultiSort: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...props,
  });

  const {
    setPageSize,
    setPageIndex,
    getRowModel,
    getState,
  } = tableInstance;

  const { columnFilters: filters, sorting: sortBy } = getState();

  // Access the rows and render them
  const rows = getRowModel().rows;

  useEffect(() => {
    setPageSize(getDefaultTablePageSize(tableId));
    // gotoPage(0);
  }, []);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters]);

  // it should be fince since we don't expect this setting to be dynamically changed
  // in case it is changed it will fail with a hooks-related exception and it's good
  if (enableTableStatePersistance) {
    useEffect(() => {
      saveFilters<any>(tableId, filters);
    }, [filters]);

    useEffect(() => {
      saveSortBy<any>(tableId, sortBy);
    }, [sortBy]);
  }

  const noFooter = columns.every((column: any) => !column.Footer);

  return <DesktopTable
    {...tableInstance}
    tableId={tableId}
    languageStrings={i18n(language)}
    noFooter={noFooter}
    totalCount={rows.length}
    loading={loading}
    isStriped={isStriped}
  />
}

function fuzzyTextFilterFn(rows: Row<any>[], id: string, filterValue: string) {
  return matchSorter(rows, filterValue, {
    keys: [(row) => row.values[id]],
  });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: string) => !val;
