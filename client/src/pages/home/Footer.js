import React from "react";
import "./Footer.css";

const Footer = () => {
  const footerList = require("../../data/footer.json");
  return (
    <div className="footer">
      <table>
        <tbody>
          {footerList.map((items) => {
            return (
              <tr key={items.col_number}>
                {items.col_values.map((data) => {
                  return <td key={data}>{data}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Footer;
