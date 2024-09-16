import { action } from '@storybook/addon-actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { createColumnHelper } from '@tanstack/react-table';
import { ClientTable, SelectColumnFilter } from '..';
import {
  data,
  someTypesStrings,
  all,
  someTypesOptions,
} from './tableData';

const columnHelper = createColumnHelper();

const column = [
  columnHelper.accessor('employee', {
    header: 'Employee',
    cell: (info) => info.getValue(),
    footer: () => 'Total',
    meta: {
      nonMobileColumn: true,
      principalFilterableColumn: true,
    },
    filterFn: 'fuzzy', // Replace `fuzzyText` filter with `fuzzy` in v8
  }),
  columnHelper.accessor('weight', {
    header: 'Weight (%)',
    footer: () => 100,
    size: 140,
    enableColumnFilter: false, // `disableFilters` is now `enableColumnFilter`
  }),
  columnHelper.accessor('plannedSales', {
    header: 'Planned',
    footer: () => '48 529 957,27',
    size: 200,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('previousSales', {
    header: 'Previous',
    footer: () => '42 238 542,94',
    size: 200,
    enableSorting: false, // `disableSortBy` is now `enableSorting`
    enableColumnFilter: false,
  }),
  columnHelper.accessor('actualSales', {
    header: 'Actual',
    footer: () => '47 193 196,2',
    size: 200,
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('targetAchivementPercent', {
    header: 'Target',
    footer: () => '97,25',
    size: 100,
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('targetAchivementPercent', {
    header: 'Forecasting',
    id: 'newSlider',
    size: 220,
    cell: () => <input type="range" min={0} max={100} defaultValue={79} />,
    enableSorting: false,
    enableColumnFilter: false,
    meta: {
      twoRowsMobileLayout: true,
      noFooterColumn: true,
    },
  }),
  columnHelper.accessor((row) => row.forcastedBonus || row.calculatedBonus, {
    id: 'calculatedBonus',
    header: 'Bonus',
    cell: (info) => info.getValue(),
    enableSorting: false,
    enableColumnFilter: false,
    meta: {
      noFooterColumn: true,
    },
  }),
  columnHelper.accessor('someType', {
    header: 'Type',
    cell: (info) => someTypesStrings[info.getValue()],
    filterFn: 'equals', // Assuming you want to use a select filter
    meta: {
      noFooterColumn: true,
      selectFilterOptions: [all, ...someTypesOptions],
    },
  })
];



const actions = [
  {
    name: 'open-dictionaries-action',
    show: () => true,
    renderIcon: () => <FontAwesomeIcon icon={faBook} />,
    renderText: () => 'Open Dictionaries',
    onClick: action('onActionClick'),
  },
  {
    name: 'open-dictionaries1-action',
    show: () => true,
    renderText: () => 'Open Dictionaries',
    onClick: action('onActionClick'),
  },
];

export const ClientDataTable = ({
  loading,
  language,
  isStriped,
}) => (
  <ClientTable
    tableId="tc-story-bonus-table"
    data={data}
    onFiltersChange={action('onFiltersChange')}
    order={{
      id: 'weight',
      desc: true,
    }}
    language={language}
    loading={loading}
    isStriped={isStriped}
    enableTableStatePersistance
    actions={actions}
    columns={column}

  />
);