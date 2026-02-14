let state = 0;

function openLetter() {
  const scene = document.getElementById("scene");
  const paper = document.getElementById("paper");

  if (state === 2) {
    state = 0;
    scene.classList.remove("open");
    paper.classList.remove("peek", "out");
    return;
  }

  if (state === 0) {
    state = 1;

    // ฝาพับขึ้น
    scene.classList.add("open");

    // กระดาษโผล่ขึ้นครึ่งนึง
    setTimeout(() => {
      paper.classList.add("peek");
    }, 600);

    // กระดาษออกมาเต็มใบ
    setTimeout(() => {
      paper.classList.remove("peek");
      paper.classList.add("out");
      state = 2;
    }, 1400);
  }
}
