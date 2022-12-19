import { Box, Paper, TableBody, TableContainer, TablePagination, Checkbox, TableCell, TableRow, IconButton } from "@mui/material";
import React, { useState } from "react"
import { Table } from "reactstrap";
import { EnhancedTableHead, StyledTableCell, StyledTableRow, stableSort, getComparator, EnhancedTableToolbar, ColString } from "./Table";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export const DataGrid = ({ defaultRowsPerPage = 10, columns, rows = [], primary = 'id', colapseColumns, collapseCallback }) => {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [collapsed, setCollapsed] = useState([]);
    const [colItems, setColItems] = useState({})

    const toggleCollapse = async (item) => {
        const col = [...collapsed];
        const on = col.indexOf(item[primary]);
        if (on !== -1) {
            col.splice(on, 1);
        } else {
            if (!colItems[primary]) {
                const resp = await collapseCallback(item);
                if (resp.error) {
                    return;
                }
                const ci = { ...colItems }
                ci[item[primary]] = resp;
                setColItems(ci);
            }
            col.push(item[primary])
        }
        setCollapsed(col);
    }


    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ with: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} size="medium" aria-label="a dense table">
                        <EnhancedTableHead
                            headCells={columns}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (<>
                                        <StyledTableRow
                                            key={`${row.id}_${row.name}`}
                                            scope="row"
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            selected={isItemSelected}
                                        >
                                            <StyledTableCell padding='checkbox' scope="row" key={row.id}>
                                                <Checkbox
                                                    color="primary"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': row.id,
                                                    }}
                                                />
                                            </StyledTableCell>

                                            {columns.map((item, idx) => (
                                                item.id === primary ?
                                                    <StyledTableCell key={item.id}
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >{row[item.id]}</StyledTableCell>
                                                    :
                                                    <StyledTableCell align="left" key={item.id}>
                                                        {item.format ? item.format(row) : row[item.id]}
                                                    </StyledTableCell>
                                            ))}

                                            {colapseColumns && <TableCell>
                                                <IconButton
                                                    arial-label="expand row"
                                                    size="small"
                                                    onClick={() => toggleCollapse(row)}
                                                >
                                                    {collapsed.includes(row.id) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                </IconButton>
                                            </TableCell>}

                                        </StyledTableRow>
                                        {colapseColumns && <ColString key={`${row.id}_col`} open={collapsed.includes(row.id)} colapseColumns={colapseColumns} rows={colItems[row.id]} />}
                                    </>)
                                })
                            }
                        </TableBody>
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}