
import imagesdata from "src/shared/data/images";

export default class Images {
  static randomImages = () => {
    // Pick a random image from the imagesdata array
    const randomIndex = Math.floor(Math.random() * imagesdata.length);
    const src = imagesdata[randomIndex].url;

    return src;
  };
}
