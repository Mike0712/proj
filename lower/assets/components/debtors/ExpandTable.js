import React, { useState, useEffect } from 'react';
import { withTranslation } from "react-i18next";
import { getDebtsShortThunk } from "store/reducers/debtorSlice";
import { useDispatch } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';


function ExpandTable({ debtorId, currencyId, t }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDebtsShortThunk({ debtorId, currencyId }))
            .then(({ payload }) => payload.status !== 'error' ? setDebts(payload) : null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [debts, setDebts] = useState([]);

    return (<ToolkitProvider
        keyField='id'
        columns={[
            {
                dataField: 'docName',
                text: t('Document\'s name'),
                formatter: (cell, row) => (<><Link to={`/documents/${row.debtDocumentId}`}>{row.docName}</Link></>)
            },
            {
                dataField: 'docDate',
                text: t('Document\'s date'),
                formatter: (cell, row) => (<>{row.docDate ? new Date(row.docDate).toLocaleDateString() : null}</>),
            },
            {
                dataField: 'company',
                text: t('Company')
            },
            {
                dataField: 'amount',
                text: t('Amount')
            }
        ]}
        data={debts}
    >
        {toolkitProps => (
            <>
                <Row>
                    <Col xl="12">
                        <div className="table-responsive">
                            <BootstrapTable
                                keyField={'prim'}
                                responsive
                                bordered={false}
                                striped={false}
                                classes={
                                    "table align-middle table-nowrap"
                                }
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                            />
                        </div>
                    </Col>
                </Row>
            </>
        )}
    </ToolkitProvider>
    )
}

export default withTranslation()(ExpandTable);