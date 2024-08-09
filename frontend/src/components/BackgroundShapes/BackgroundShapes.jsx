import React from "react";
import shape from "../../assets/img/bg/banner-shape-1.png";
import object from "../../assets/img/bg/object-3d-1.png";
import object2 from "../../assets/img/bg/object-3d-2.png";
const BackgroundShapes = () => {
  return (
    <div class="background-shapes">
      <div class="shape-1 common-shape">
        <img src={shape} alt="banner-shape-1" />
      </div>
      <div class="shape-2 common-shape">
        <img src={shape} alt="banner-shape-1" />
      </div>
      <div class="threed-shape-1 move-with-cursor" data-value="1">
        <img src={object} alt="object-3d-1" />
      </div>
      <div class="threed-shape-2 move-with-cursor" data-value="1">
        <img src={object2} alt="object-3d-2" />
      </div>
    </div>
  );
};

export default BackgroundShapes;