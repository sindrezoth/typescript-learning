"use strict";
// CommonJS
// const year = document.getElementById("year");
// const thisYear = new Date().getFullYear();
// year?.setAttribute("datetime", thisYear)
// year?.textContent = thisYear;
{
    // TypeGuard
    const year = document.getElementById("year");
    const thisYear = new Date().getFullYear();
    if (year) {
        year.setAttribute("datetime", "" + thisYear);
        year.textContent = "" + thisYear;
    }
}
{
    // Type casting
    const year = document.getElementById("year");
    const thisYear = new Date().getFullYear();
    year.setAttribute("datetime", "" + thisYear);
    year.textContent = "" + thisYear;
}
