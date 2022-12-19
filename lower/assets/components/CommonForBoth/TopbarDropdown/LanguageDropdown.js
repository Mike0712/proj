import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { map } from "lodash";

//i18n
import i18n from "../../../i18n";
import { withTranslation } from "react-i18next";
import languages from "components/common/languages";

function LanguageDropdown(props) {
  const [menu, setMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
    setSelectedLang(currentLanguage);
  }, []);

  const changeLanguageAction = async lang => {
    //set language as i18n
    i18n.changeLanguage(lang);
    localStorage.setItem("I18N_LANGUAGE", lang);
    setSelectedLang(lang);
    // await addToSession({ lang });
    window.location.reload();
  }

  return (
    <>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
        <DropdownToggle className="btn header-item" tag="button">
          <img
            src={languages[selectedLang].flag}
            alt="Skote"
            height="16"
            className="me-1"
          />
        </DropdownToggle>
        <DropdownMenu className="language-switch dropdown-menu-end">
          {map(Object.keys(languages), key => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${selectedLang === key ? "active" : "none"
                }`}
            >
              <img
                src={languages[key].flag}
                alt="Skote"
                className="me-1"
                height="12"
              />

              <span className="align-middle">
                {languages[key].label}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default withTranslation()(LanguageDropdown);
