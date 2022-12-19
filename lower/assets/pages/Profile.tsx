import { useState, useEffect, FC } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

import avatar from "styles/images/users/avatar-1.jpg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const { t } = useTranslation();

  const { control } = useForm();
  const onChange = (code: string) => {
    if (code.length === 5) {
      // dispatch(smsConfirmationThunk(code));
    }
  };

  const resendSms = () => {
    // dispatch(resendSmsThunk({ typeName: 'confirmation_for_creditor' }))
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showCreditorProfile, setShowCreditorProfile] = useState();
  const expireTime = useSelector(
    (state: RootState) => state.system.smsExpireTime
  );

  useEffect(() => {
    if (userData.firstName) {
      setName(`${userData.firstName} ${userData.lastName}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div className="me-3">
                    <img
                      src={avatar}
                      alt=""
                      className="avatar-md rounded-circle img-thumbnail"
                    />
                  </div>
                  <div className="align-self-center flex-1">
                    <div className="text-muted">
                      <h5>{name}</h5>
                      <p className="mb-1">{email}</p>
                      <p className="mb-0">Id no: #</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
