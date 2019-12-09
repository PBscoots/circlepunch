function getPerformance(n, func){

    let t0 = performance.now();
    let value = func(n);
    let t1 = performance.now();
    console.log("Fib Value =" + value);
    
    return t1-t0;
}