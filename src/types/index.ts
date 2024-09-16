import { ReactNode } from 'react';
import {
  Column,
  Filters,
  Row,
  UsePaginationInstanceProps,
  UseTableInstanceProps,
} from 'react-table';

// this type is made to see the keys
export type I18StringsProps = {
  langKey: string;
  loadingLabel: string;
  noRecordsLabel: string;
  totalLabel: string;
  searchLabel: string;
  actionsLabel: string;
  sorting: {
    titleLabel: string;
    columnLabel: string;
    directionLabel: string;
    ascLabel: string;
    descLabel: string;
  },
  filtration: {
    titleLabel: string;
  },
  pagination: {
    desktop: {
      shownLabel: string;
      toLabel: string;
      ofLabel: string;
      showLabel: string;
      noRecordsLabel: string;
      singleRecordLabel: string;
      firstPageLabel: string;
      previousPageLabel: string;
      nextPageLabel: string;
      lastPageLabel: string;
    },
    mobile: {
      shownLabel: string;
      ofLabel: string;
      showMoreLabel: string;
    },
  },
};

export interface IAction<TableProps extends object = {}> {
  name?: string;
  show?: (row?: Row<TableProps>) => boolean;
  renderIcon?: (row?: Row<TableProps>) => JSX.Element | ReactNode;
  renderText?: (row?: Row<TableProps>) => string | ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>, row?: Row<TableProps>) => unknown;
}

export interface IDesktopPagination {
  tableId: string;
  totalCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  gotoPage: (x: number) => unknown;
  nextPage: () => unknown;
  previousPage: () => unknown;
  setPageSize: (x: number) => unknown;
  pageIndex: number;
  pageSize: number;
  languageStrings: I18StringsProps;
}

export interface IDesktopTable<TableProps extends object = {}> extends
  UsePaginationInstanceProps<TableProps>,
  UseTableInstanceProps<TableProps> {
  tableId: string;
  totalCount: number;
  noFooter?: boolean;
  loading?: boolean;
  isStriped?: boolean;
  languageStrings: I18StringsProps;
}

export interface IClientTable<TableProps extends object = {}> {
  tableId: string;
  columns: Column<TableProps>[];
  data: TableProps[];
  order?: {
    id: string;
    desc: boolean;
  } | {};
  language?: string;
  renderMobileTitle: ((row: Row<TableProps>) => JSX.Element) | (() => ReactNode);
  maxStillMobileBreakpoint?: number;
  loading?: boolean;
  isStriped?: boolean;
  actions?: IAction<TableProps>[];
  onFiltersChange?: (filter?: Filters<TableProps>) => void;
  enableTableStatePersistance?: boolean;
  [key: string]: string | number | undefined | ((row?: Row<TableProps>) => ReactNode) | ((row?: Row<TableProps>) => JSX.Element) | ReactNode;
}

export type Params = {
  draw: number;
  page: number;
  pageSize: number;
  orderBy: string;
  orderingDirection: 'desc' | 'asc';
  filteredByColumns: string[];
  filteredByValues: string[];
};