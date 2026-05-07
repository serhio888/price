import React from "react";
import "./header.css";
import tel from "../assets/tel.png";
import email from "../assets/email.png";
import max from "../assets/max.png";
import location from "../assets/location.png";
import vk from "../assets/vk.png";

const Header = () => {
  return (
    <div className="visitka-header">
      <div>
        <h2>Селиванова Мария Сергеевна</h2>
      </div>
      <div>
        <span>Врач-косметолог</span>
      </div>
      <div className="cosmetologist-block-info">
        <div className="cosmetolog-info">
          <img src={tel} alt="tel" className="images-icons" />
          <a href="tel:+79082468092">+79082468092</a>
        </div>
        <div className="cosmetolog-info">
          <img src={email} alt="email" className="images-icons" />
          <a href="mailto:makkaloy@mail.ru">Электронная почта</a>
        </div>
        <div className="cosmetolog-info">
          <img src={max} alt="max" className="images-icons" />
          <a
            href="https://max.ru/u/f9LHodD0cOKinE_8BHnrHULTsgGQsSsXpOVIwt2WpO1_VYEGbkwXU92hFOk"
            target="_blank"
          >
            Написать в MAX
          </a>
        </div>
        <div className="cosmetolog-info">
          <img src={location} alt="location" className="images-icons" />
          <a
            href="https://yandex.ru/maps/?pt=55.476565,57.287256&z=15&l=map"
            target="_blank"
          >
            Посмотреть на Яндекс Картах
          </a>
        </div>
        <div className="cosmetolog-info">
          <img src={vk} alt="vk" className="images-icons" />
          <a href="https://vk.com/cosmetologist_sms">cosmetologist_sms</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
