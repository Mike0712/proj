import React, { useState } from 'react';
import { Container } from 'reactstrap';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { accountDebtsThunk } from 'store/thunks/debtorThunk';
import { Link } from 'react-router-dom';
import { DataGrid } from 'components/UI/DataGrid';
import { AccountDebt } from 'store/types/debtor';
import { AppDispatch } from 'store';


const columns = [{
    id: 'id',
    label: 'Id',
}, {
    id: 'name',
    label: 'Name',
    numeric: false,
    format: (item: AccountDebt) => <Link to={`/debtors/${item.id}`}>{item.docName}</Link>
}, {
    id: 'debtSum',
    label: 'Amount',
    numeric: true
}, {
    id: 'deadline',
    label: 'Deadline',
    numeric: false,
    format: (item: AccountDebt) => new Date(item.deadline).toLocaleDateString()
}, {
    id: 'email',
    label: 'Email',
    numeric: false
}, {
    id: 'phoneNumber',
    label: 'Phone number',
    numeric: false
}];
const colapseColumns = [
    { id: 'debtDocumentId', label: 'ID' },
    { id: 'docName', label: 'Document\'s name' },
    { id: 'docDate', label: 'Document\'s date', format: (item: AccountDebt) => item.docDate && new Date(item.docDate).toLocaleDateString() },
    { id: 'amount', label: 'Amount' },
    { id: 'company', label: 'Company' },
]

function List() {
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const [list] = useState([]);
    useEffect(() => {
        dispatch(accountDebtsThunk())
        // .then(({ payload, error }) => {x
        //     if (payload?.data?.data) {
        //         setList(payload.data.data);
        //     }
        // });
    }, [dispatch]);

    // const collapseCallback = (item) => dispatch(debtsThunk({ debtorId: item.id, currencyId: item.currencyId }))
    //     .then(({ payload }) => payload);

    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title={t('Debtors')} breadcrumbItem={t('Debtors list')} />
                <DataGrid columns={columns} rows={list} colapseColumns={colapseColumns}
                collapseCallback={[]} />
            </Container>
        </div>
    )
}

export default List;