import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import items, { menuItem, menuChild,Roles } from "api/sidebarMenu";
import { RootState } from "store";
import { useSelector } from "react-redux";

function SidebarContent() {
  const { t } = useTranslation();
  const role = useSelector((state: RootState) => state.user.role);

  const [menuItems, setMenuItems] = useState<menuItem[]>([]);

  useEffect(() => {
    if (role) {
      const curItms: menuItem[] = items.filter(
        (item) => !item.role || Object.values(item.role).includes(role as Roles)
      );
      setMenuItems(curItms);
    }
  }, [role]);

  const sub = (items: menuChild[]) => (
    <ul className="sub-menu">
      {items.map((item, idx) => (
        <li key={`sub-${idx}`}>
          <Link to={item.to}>{t(item.name)}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title">{t("Menu")}</li>
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link to={item.to}>
                {item.icon ? <i className={`bx ${item.icon}`} /> : null}
                <span>{t(item.name)}</span>
              </Link>
              {item.items ? sub(item.items) : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  type: PropTypes.string,
};

export default SidebarContent;
