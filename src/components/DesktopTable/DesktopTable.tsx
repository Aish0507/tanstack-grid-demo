/* eslint-disable no-nested-ternary */
import React, { CSSProperties, useRef } from "react";

import {
  TableSortByToggleProps,
  UseTableCellProps,
  UseTableColumnProps,
} from "react-table";

import DesktopPagination from "./components/DesktopPagination/DesktopPagination";
import NoRecords from "../NoRecords/NoRecords";

import { ACTIONS_COLUMN_ID } from "../Actions/actionsColumnFactory";

import "./DesktopTable.css";
import { IDesktopTable } from "../../types";
import { flexRender } from "@tanstack/react-table";

type ICustomProps = {
  colSpan: number;
  style: CSSProperties;
  key: string;
};

const getStyles = (id: string) => {
  let style = {}
  if (id !== ACTIONS_COLUMN_ID) {
    style = {
      'position': 'relative',
      'boxSizing': 'border-box',
      'flex': '150 0 auto',
      'minWidth': '80px',
      'width': '150px',
      'cursor': 'pointer'
    }
  } else {
    style = {
      'position': 'relative',
      'boxSizing': 'border-box',
      'flex': '74 0 auto',
      'minWidth': '74px',
      'width': '74px'
    }
  }

  return style
}
const getFilterStyles = (id: string) => {
  let style = {}
  if (id !== ACTIONS_COLUMN_ID) {
    style = {
      'position': 'relative',
      'boxSizing': 'border-box',
      'flex': '150 0 auto',
      'minWidth': '80px',
      'width': '150px',
      'cursor': 'pointer'
    }
  } else {
    style = {
      'position': 'relative',
      'boxSizing': 'border-box',
      'flex': '74 0 auto',
      'minWidth': '74px',
      'width': '74px'
    }
  }
  return style
}
const getCellStyles = (id: string) => {
  let style = {}
  if (id !== ACTIONS_COLUMN_ID) {
    style = {
      boxSizing: 'border-box', flex: '200 0 auto',
      minWidth: '80px', width: '150px',
      justifyContent: 'flex-start',
      alignItems: 'flex-start', display: 'flex'
    }
  } else {
    style = {
      'position': 'relative',
      'boxSizing': 'border-box',
      'flex': '74 0 auto',
      'minWidth': '74px',
      'width': '74px'
    }
  }
  return style
}


const setActionCellClassname = <T extends object = {}>(
  column: UseTableColumnProps<T>
) => (column.id === ACTIONS_COLUMN_ID ? "tc-table-desktop__action-cell" : "");

export default function DesktopTable(props: any) {
  const {
    getState,
    getPageCount,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
    gotoPage,
    setPageSize,
    getHeaderGroups,
    getFooterGroups,
    getRowModel,
    getTableProps,
  } = props;
  const {
    pagination: { pageIndex, pageSize },
  } = getState();

  const { loadingLabel } = props.languageStrings;
  const rows = getRowModel().rows;
  const page = rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  const totalCount = rows.length;
  const canNextPage = getCanNextPage();
  const canPreviousPage = getCanPreviousPage();
  const pageCount = getPageCount();

  const tableContainerRef = useRef<HTMLDivElement>(null);
  
  const isStripedClassname = props.isStriped
    ? "tc-table-desktop__tr--striped"
    : "";

  return (
    <div ref={tableContainerRef} className="tc-table-desktop">
      <div className="tc-table-desktop__inner">
        <div role="table" style={{ 'minWidth': '974px' }} className="tc-table-desktop__content">
          <div className="tc-table-desktop__header">
            {getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={`headergroup-wrapper-${headerGroup.id}`}>
                <div role="row" className="tc-table-desktop__tr"
                  style={{ 'display': 'flex', 'flex': '1 0 auto', 'minWidth': '974px' }}>
                  {headerGroup.headers.map((header) => (
                    <div
                      role="columnheader"
                      style={getStyles(header.id)}
                      title={
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ) as string
                      }
                      className={`tc-table-desktop__th tc-table-desktop__th--header
                        ${setActionCellClassname(header)}
                        ${header.isSorted
                          ? header.isSortedDesc
                            ? "tc-table-desktop__th--sort-desc"
                            : "tc-table-desktop__th--sort-asc"
                          : ""
                        }`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* Use column.getResizerProps to hook up the events correctly */}
                      {header.canResize && (
                        <div
                          {...header.getResizerProps({
                            // This disables sorting when resizing ends
                            onClick: (e: Event) => {
                              e.stopPropagation();
                              e.preventDefault();
                            },
                          })}
                          className="resizer"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div
                  style={{ 'display': 'flex', 'flex': '1 0 auto', 'minWidth': '974px' }}
                  key="filters-row"
                  className="tc-table-desktop__tr tc-table-desktop__tr--filter"
                >
                  {headerGroup.headers.map((column) => (
                    <div
                      style={getFilterStyles(column.id)}
                      className={`tc-table-desktop__th ${setActionCellClassname(
                        column
                      )}`}
                    >
                      {/* Render the columns filter UI */}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="tc-table-desktop__body">
            {page?.map((row) => {
              // prepareRow(row);
              return (
                <div
                  style={{ 'display': 'flex', 'flex': '1 0 auto', minWidth: '974px' }}
                  key={row.id}
                  className={`tc-table-desktop__tr ${props.isStripedClassname ?? ''}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div
                      style={getCellStyles(cell.column.id)}

                      className={`tc-table-desktop__td  ${setActionCellClassname(
                        cell.column
                      )}`}
                    >
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        tableContainerRef,
                      })}
                    </div>
                  ))}
                </div>
              );
            })}

            {rows.length === 0 && (
              <NoRecords languageStrings={props.languageStrings} />
            )}

            {!props.noFooter &&
              rows.length > 0 &&
              props.footerGroups.map((group) => (
                <div
                  style={{ display: 'flex', flex: '1 0 auto', minWidth: '974px' }}
                  {...group.getFooterGroupProps()}
                  key={`footergroup-${group.id}`}
                  className="tc-table-desktop__tr tc-table-desktop__tr--footer"
                >
                  {group.headers.map((column) => (
                    <div

                      key={`footercolumn-${column.id}`}
                      className={`tc-table-desktop__td ${setActionCellClassname(
                        column
                      )}`}
                    >
                      {column.render("Footer")}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      <DesktopPagination
        tableId={props.tableId}
        totalCount={totalCount || rows.length}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
        languageStrings={props.languageStrings}
      />

      {props.loading && (
        <div className="tc-table-desktop__loading-overlay">{loadingLabel}</div>
      )}
    </div>
  );
}
