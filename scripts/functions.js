
   let isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    let clamp = function (n, min, max){
        return Math.min(Math.max(proficiency, min), max);
    }

    export { isNumeric, clamp };