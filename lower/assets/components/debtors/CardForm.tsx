import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DebtorInfo from "components/debtors/steps/DebtorInfo";
import { DebtDoc } from "components/debtors/steps/DebtDoc";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Col,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Action } from "store/types/common";

interface CardFormProps {
  mode: Action;
  debtorId?: string;
}

function CardForm({ mode, debtorId }: CardFormProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [tabCollection, setTabCollection] = useState<number[]>([1]);

  const maxTab = 2;

  const prev = () => {
    setActiveTab(activeTab - 1);
  };

  const next = () => {
    const newTab = activeTab + 1;
    setActiveTab(newTab);
    const tc = [...tabCollection];
    tc.push(newTab);
    setTabCollection(tc);
  };

  const toggleTab = (val: number) => {
    if (tabCollection.includes(val)) {
      setActiveTab(val);
    }
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">
              {t("Information about the debtor")}
            </h4>
            <div className="wizard clearfix">
              {activeTab > maxTab ? null : (
                <div className="steps clearfix">
                  <ul>
                    <NavItem
                      className={classnames({
                        current: activeTab === 1,
                      })}
                    >
                      <NavLink
                        className={classnames({
                          active: activeTab === 1,
                        })}
                        onClick={() => {
                          toggleTab(1);
                        }}
                      >
                        <span className="number">1</span>{" "}
                        {t("Common information")}
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={classnames({
                        current: activeTab === 2,
                      })}
                    >
                      <NavLink
                        // disabled={!(passedSteps || []).includes(2)}
                        className={classnames({
                          active: activeTab === 2,
                        })}
                        onClick={() => {
                          toggleTab(2);
                        }}
                      >
                        <span className="number">2</span>{" "}
                        <span>{t("Debt document")}</span>
                      </NavLink>
                    </NavItem>
                  </ul>
                </div>
              )}
              <div className="content clearfix">
                <TabContent activeTab={activeTab} className="body">
                  <TabPane tabId={1}>
                    <DebtorInfo t={t} mode={mode} next={next} />
                  </TabPane>
                  <TabPane tabId={2}>
                    <DebtDoc t={t} mode={mode} next={next} prev={prev} />
                  </TabPane>
                  <TabPane tabId={3}>
                    <div className="row justify-content-center">
                      <Col lg="6">
                        <div className="text-center">
                          <div className="mb-4">
                            <i className="mdi mdi-check-circle-outline text-success display-4" />
                          </div>
                          <div>
                            <h5>{t("Debtor added successfully")}</h5>
                          </div>
                        </div>
                      </Col>
                    </div>
                  </TabPane>
                </TabContent>
              </div>
              <div className="d-md-flex">
                {mode === Action.r ? (
                  <Link
                    type="button"
                    to={`/debtors/${debtorId}/edit`}
                    className="btn btn-success w-sm"
                    onClick={(e) => {}}
                  >
                    <i className="mdi mdi-pencil d-block font-size-16"></i>
                    {t("Edit")}
                  </Link>
                ) : null}
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default CardForm;
