// CommonJS
// const year = document.getElementById("year");
// const thisYear = new Date().getFullYear();
// year?.setAttribute("datetime", thisYear)
// year?.textContent = thisYear;

{
  // TypeGuard
  const year: HTMLElement | null = document.getElementById("year");
  const thisYear = new Date().getFullYear();
  if (year) {
    year.setAttribute("datetime", "" + thisYear);
    year.textContent = "" + thisYear;
  }
}

{
  // Type casting
  const year = document.getElementById("year") as HTMLSpanElement;
  const thisYear = new Date().getFullYear();
  year.setAttribute("datetime", "" + thisYear);
  year.textContent = "" + thisYear;
}
