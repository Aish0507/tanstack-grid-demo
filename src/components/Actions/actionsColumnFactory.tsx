import React, { MutableRefObject } from 'react';
import { Cell } from 'react-table';
import { I18StringsProps, IAction } from '../../types';

import ActionsDropdown from '../DesktopTable/components/ActionsDropdown/ActionsDropdown';

export const ACTIONS_COLUMN_ID = 'actions-column';

interface ICustomRow<TableProps extends object = {}> extends Cell<TableProps> {
  tableContainerRef: MutableRefObject<HTMLElement>;
}

export default function createActionsColumn<TableProps extends object = {}>(
  actions: IAction<TableProps>[],
  languageStrings: I18StringsProps,
) {
  const {
    actionsLabel,
  } = languageStrings;
console.log(actions)
  return {
    id: ACTIONS_COLUMN_ID,
    Header: '',
    accessor: 'action',
    Cell: (cell) => {
      console.log({cell})
    }
    // Header: actionsLabel,
    // disableFilters: true,
    // disableSortBy: true,
    // nonMobileColumn: true,
    // noFooterColumn: true,
    // minWidth: 74,
    // width: 74,
    // maxWidth: 74,
    // Cell: (row: any) => {
    //   // this row.row || row handles desktop and mobile cases of Cell call
    //   const rowWithValues = row.row || row;
    //   console.log(row,'33333333333333')
    //   return (
    //     <ActionsDropdown<any>
    //       tableContainerRef={row.tableContainerRef}
    //       actions={actions}
    //       rowWithValues={rowWithValues}
    //     />
    //   );
    // },
  };
}
