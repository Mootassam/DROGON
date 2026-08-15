export default class Calcule {
    
    static calcule__total = (price, comission) => {
        if (price === "" || comission === "") {
          return "";
        }
        const total =
         ( parseFloat(comission) / 100 ) * parseFloat(price) ;
        return total.toFixed(3);
      };
    
    
}