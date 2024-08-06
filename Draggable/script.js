const draggable = document.getElementById("draggable");
const container = document.getElementById("container");

let offsetX, offsetY;

// Mouse down event listener to start dragging
draggable.addEventListener("mousedown", (event) => {
  offsetX = event.clientX - draggable.getBoundingClientRect().left;
  offsetY = event.clientY - draggable.getBoundingClientRect().top;

  console.log(offsetX, offsetY);

  // Mouse move event listener to drag the element
  document.addEventListener("mousemove", onMouseMove);

  // Mouse up event listener to stop dragging
  document.addEventListener("mouseup", () => {
    const containerBoundingRect = container.getBoundingClientRect();
    const contLeft = containerBoundingRect.left;
    const contTop = containerBoundingRect.top;
    const contBottom = containerBoundingRect.bottom;
    const contRight = containerBoundingRect.right;

    const draggableBoundingRect = draggable.getBoundingClientRect();
    const draggableLeft = draggableBoundingRect.left;
    const draggableTop = draggableBoundingRect.top;
    const draggableBottom = draggableBoundingRect.bottom;
    const draggableRight = draggableBoundingRect.right;
    
    if (
      draggableLeft > contLeft &&
      draggableRight < contRight &&
      draggableTop > contTop &&
      draggableBottom < contBottom
    ) {
      draggable.style.left = contLeft + 25 + "px";
      draggable.style.top = contTop + 10 + "px";
    }
    document.removeEventListener("mousemove", onMouseMove);
  });
});

// Function to handle dragging
function onMouseMove(event) {
  const x = event.clientX - offsetX;
  const y = event.clientY - offsetY;

  // Set new position of draggable
  draggable.style.left = x + "px";
  draggable.style.top = y + "px";
}
