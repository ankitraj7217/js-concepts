(function () {
    const toggleEle = document.querySelector(".dropdown-header__toggle");
    const detailEle = document.querySelector(".dropdown-detail");
  
    let toggle = false; // false -> Down, true -> Up
    console.log(detailEle);

    function _onPress() {
      toggle = !toggle;
      if (toggle) {
        toggleEle.textContent = "Up";
        detailEle.classList.add("open");
      } else {
        toggleEle.textContent = "Down";
        detailEle.classList.remove("open");
      }
    }
  
    toggleEle.addEventListener("click", _onPress);
    toggleEle.addEventListener("keydown", (e) => {
        if (e.key === "Enter") _onPress();
    })
  })();
  