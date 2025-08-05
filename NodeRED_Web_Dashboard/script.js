
const modes = {
  0: { efficiency: 60, motor_rpm: 2000, wheel_speed: 30, mode: "RAIN" },
  1: { efficiency: 70, motor_rpm: 2500, wheel_speed: 45, mode: "ROAD" },
  2: { efficiency: 85, motor_rpm: 4000, wheel_speed: 75, mode: "OFF-ROAD" },
  off: { efficiency: 0, motor_rpm: 0, wheel_speed: 0, mode: "OFF" },
};

let wheelGauge = new Chart(document.getElementById("wheelGauge"), {
  type: "doughnut",
  data: {
    labels: ["Speed", "Remaining"],
    datasets: [{ data: [0, 150], backgroundColor: ["#00bfff", "#eee"] }],
  },
  options: { plugins: { title: { display: true, text: "Wheel Speed (km/h)" } } },
});

let rpmGauge = new Chart(document.getElementById("rpmGauge"), {
  type: "doughnut",
  data: {
    labels: ["RPM", "Remaining"],
    datasets: [{ data: [0, 5000], backgroundColor: ["#3366ff", "#eee"] }],
  },
  options: { plugins: { title: { display: true, text: "Motor RPM" } } },
});

let effGauge = new Chart(document.getElementById("effGauge"), {
  type: "doughnut",
  data: {
    labels: ["Efficiency", "Remaining"],
    datasets: [{ data: [0, 100], backgroundColor: ["#00cc66", "#eee"] }],
  },
  options: { plugins: { title: { display: true, text: "Efficiency (%)" } } },
});

let dampingChart = new Chart(document.getElementById("dampingChart"), {
  type: "line",
  data: { labels: [], datasets: [] },
  options: {
    responsive: true,
    plugins: { title: { display: true, text: "Damping Characteristics" } },
  },
});

function setMode(mode) {
  const data = modes[mode];
  updateGauges(data);
  updateChart(mode);
}

function updateGauges({ wheel_speed, motor_rpm, efficiency }) {
  wheelGauge.data.datasets[0].data = [wheel_speed, 150 - wheel_speed];
  rpmGauge.data.datasets[0].data = [motor_rpm, 5000 - motor_rpm];
  effGauge.data.datasets[0].data = [efficiency, 100 - efficiency];
  wheelGauge.update();
  rpmGauge.update();
  effGauge.update();
}

function updateChart(mode) {
  const xValues = [-1, 0, 1, 2, 3, 5, 6];
  let y1 = [], y2 = [], label1 = "", label2 = "", color1 = "", color2 = "";

  if (mode === 0) {
    y1 = [0, 165, 234, 321, 412, 632, 735];
    y2 = [0, -37, -62, -72, -79, -93, -98];
    label1 = "Rain"; label2 = "Rain Comp";
    color1 = "#00FF00"; color2 = "#8A2BE2";
  } else if (mode === 1) {
    y1 = [0, 63, 170, 270, 357, 556, 657];
    y2 = [0, -38, -61, -72, -79, -92, -98];
    label1 = "Comfort"; label2 = "Comfort Comp";
    color1 = "#FF0000"; color2 = "#FF69B4";
  } else if (mode === 2) {
    y1 = [0, 224, 297, 390, 488, 706, 823];
    y2 = [0, -55, -80, -90, -97, -111, -117];
    label1 = "Sport"; label2 = "Sport Comp";
    color1 = "#0000FF"; color2 = "#DAA520";
  } else {
    dampingChart.data.labels = [];
    dampingChart.data.datasets = [];
    dampingChart.update();
    return;
  }

  dampingChart.data.labels = xValues;
  dampingChart.data.datasets = [
    { label: label1, data: y1, borderColor: color1, fill: false },
    { label: label2, data: y2, borderColor: color2, fill: false },
  ];
  dampingChart.update();
}

setMode("off");
