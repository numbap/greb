import { Icon, Point } from "leaflet";

import i0D from "./0D.svg"
import i1D from "./1D.svg"
import i2D from "./2D.svg"
import i3D from "./3D.svg"
import i4D from "./4D.svg"
import i5D from "./5D.svg"
import i6D from "./6D.svg"
import i7D from "./7D.svg"
import i8D from "./8D.svg"
import i9D from "./9D.svg"


import i0L from "./0L.svg"
import i1L from "./1L.svg"
import i2L from "./2L.svg"
import i3L from "./3L.svg"
import i4L from "./4L.svg"
import i5L from "./5L.svg"
import i6L from "./6L.svg"
import i7L from "./7L.svg"
import i8L from "./8L.svg"
import i9L from "./9L.svg"
import outlier from "./outlier.svg"

let iconArray = {
    light:[i0L, i1L, i2L, i3L, i4L, i5L, i6L, i7L, i8L, i9L], 
    dark: [i0D, i1D, i2D, i3D, i4D, i5D, i6D, i7D, i8D, i9D], 
    lightImg: [i0L, i1L, i2L, i3L, i4L, i5L, i6L, i7L, i8L, i9L],
    darkImg: [i0D, i1D, i2D, i3D, i4D, i5D, i6D, i7D, i8D, i9D],
    lineColor: ["#2f8e8b", "#43aa8b", "#f94144", "#f8961e", "#85bf59", "#277da1", "#f9844a", "#f3722c", "#39668e", "#f9c74f"],
    outlier: null}

var i;
for(i = 0; i < 10; i++) {


    iconArray.dark[i] = new Icon({
        iconUrl: iconArray.dark[i],
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        padding: 0,
        iconSize: new Point(20, 35),
        //className: "leaflet-div-icon",
      });

      iconArray.light[i] = new Icon({
        iconUrl: iconArray.light[i],
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        padding: 0,
        shadowAnchor: null,
        iconSize: new Point(12, 21),
        //className: "leaflet-div-icon",
      });

      iconArray.outlier = new Icon({
        iconUrl: outlier,
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        padding: 0,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new Point(12, 21),
        //className: "leaflet-div-icon",
      });


}

export default iconArray;