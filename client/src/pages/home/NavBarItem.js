import React from "react";
import "./NavBarItem.css";

const NavBarItem = (props) => {
  return (
    <div className="nav-bar-item">
      <table>
        <tbody>
          <tr>
            {props.items.map((data, index) => (
              <td key={index} className={`${data.active && "active"}`}>
                <i className={`fa ${data.icon}`}></i>
                {data.type}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NavBarItem;
