const daycycledays = [
  "01/09/2025",
  "02/09/2025",
  "03/09/2025",
  "04/09/2025",
  "05/09/2025",
  "08/09/2025",
  "09/09/2025",
  "10/09/2025",
  "11/09/2025",
  "12/09/2025",
  "15/09/2025",
  "16/09/2025",
  "17/09/2025",
  "18/09/2025",
  "19/09/2025",
  "22/09/2025",
  "23/09/2025",
  "24/09/2025",
  "25/09/2025",
  "26/09/2025",
  "29/09/2025",
  "30/09/2025",
  "01/10/2025",
  "02/10/2025",
  "03/10/2025",
  "06/10/2025",
  "07/10/2025",
  "09/10/2025",
  "13/10/2025",
  "14/10/2025",
  "15/10/2025",
  "16/10/2025",
  "17/10/2025",
  "20/10/2025",
  "21/10/2025",
  "22/10/2025",
  "23/10/2025",
  "24/10/2025",
  "03/11/2025",
  "04/11/2025",
  "06/11/2025",
  "07/11/2025",
  "10/11/2025",
  "11/11/2025",
  "12/11/2025",
  "13/11/2025",
  "14/11/2025",
  "17/11/2025",
  "18/11/2025",
  "19/11/2025",
  "20/11/2025",
  "21/11/2025",
  "24/11/2025",
  "25/11/2025",
  "26/11/2025",
  "27/11/2025",
  "28/11/2025",
  "01/12/2025",
  "02/12/2025",
  "04/12/2025",
  "05/12/2025",
  "08/12/2025",
  "09/12/2025",
  "10/12/2025",
  "11/12/2025",
  "12/12/2025",
  "15/12/2025",
  "16/12/2025",
  "12/01/2026",
  "13/01/2026",
  "14/01/2026",
  "15/01/2026",
  "16/01/2026",
  "19/01/2026",
  "20/01/2026",
  "21/01/2026",
  "22/01/2026",
  "23/01/2026",
  "26/01/2026",
  "27/01/2026",
  "28/01/2026",
  "29/01/2026",
  "30/01/2026",
  "02/02/2026",
  "03/02/2026",
  "04/02/2026",
  "05/02/2026",
  "06/02/2026",
  "09/02/2026",
  "11/02/2026",
  "12/02/2026",
  "13/02/2026",
  "16/02/2026",
  "17/02/2026",
  "18/02/2026",
  "19/02/2026",
  "20/02/2026",
  "23/02/2026",
  "24/02/2026",
  "25/02/2026",
  "26/02/2026",
  "27/02/2026",
  "09/03/2026",
  "10/03/2026",
  "11/03/2026",
  "12/03/2026",
  "13/03/2026",
  "16/03/2026",
  "17/03/2026",
  "18/03/2026",
  "19/03/2026",
  "20/03/2026",
  "23/03/2026",
  "24/03/2026",
  "25/03/2026",
  "26/03/2026",
  "27/03/2026",
  "30/03/2026",
  "31/03/2026",
  "01/04/2026",
  "02/04/2026",
  "07/04/2026",
  "08/04/2026",
  "09/04/2026",
  "13/04/2026",
  "14/04/2026",
  "15/04/2026",
  "16/04/2026",
  "17/04/2026",
  "20/04/2026",
  "21/04/2026",
  "22/04/2026",
  "23/04/2026",
  "27/04/2026",
  "28/04/2026",
  "29/04/2026",
  "30/04/2026",
  "20/05/2026",
  "21/05/2026",
];

const starts = ["8:00", "9:00", "10:00", "11:20", "12:20"];
const ends = ["8:55", "9:55", "10:55", "12:15", "13:45"];
const header = [
  "Subject",
  "Start Date",
  "Start Time",
  "End Date",
  "End Time",
  "All Day Event",
  "Location",
];
let manualFill = document.querySelector("#manual-fill");

const STORAGE_KEY = "timetable-data";

function updatePreview() {
  const preview = document.getElementById("preview");
  if (!preview) return;
  let html = "<table><tr><th></th>";
  for (let i = 1; i <= 8; i++) html += `<th>Day ${i}</th>`;
  html += "</tr>";
  for (let j = 1; j <= 5; j++) {
    html += `<tr><th>Block ${j}</th>`;
    for (let i = 1; i <= 8; i++) {
      const val = document.querySelector(`.row${j} .day${i} input`).value;
      html += `<td>${val || ""}</td>`;
    }
    html += "</tr>";
  }
  html += "</table>";
  preview.innerHTML = html;
}

function saveData() {
  const subjects = [];
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 5; j++) {
      const query = `.row${j} .day${i} input`;
      subjects.push(document.querySelector(query).value);
    }
  }
  const data = { manualFill: manualFill.checked, subjects };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updatePreview();
}

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  try {
    const data = JSON.parse(stored);
    manualFill.checked = data.manualFill || false;
    manualFill.dispatchEvent(new Event("change"));
    if (Array.isArray(data.subjects)) {
      for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 5; j++) {
          const val = data.subjects[(i - 1) * 5 + (j - 1)];
          if (val !== undefined) {
            document.querySelector(`.row${j} .day${i} input`).value = val;
          }
        }
      }
    }
  } catch (e) {}
  updatePreview();
}

window.addEventListener("load", loadData);

document.querySelector("#clear-all").addEventListener("click", () => {
  document.querySelectorAll(".row input").forEach((inp) => (inp.value = ""));
  saveData();
});

manualFill.addEventListener("change", () => {
  if (manualFill.checked)
    document.querySelectorAll(".row .col-1 input").forEach((item) => {
      item.disabled = false;
    });
  else
    document.querySelectorAll(".row-manual .col-1 input").forEach((item) => {
      item.disabled = true;
    });
  saveData();
});

// auto-fill
for (let i = 1; i <= 8; i++) {
  let subjectElement = document.querySelector(".row1 .block" + i);
  let subjectInput = document.querySelector(".row1 .block" + i + " input");
  let subjectBlock = Array.from(subjectElement.classList).filter(
    (word) => word.slice(0, -1) == "block",
  )[0];
  subjectInput.addEventListener("input", () => {
    if (manualFill.checked) return;
    let subject = document.querySelector(".row1 .block" + i + " input").value;
    document
      .querySelectorAll(".row ." + subjectBlock + " input")
      .forEach((item) => {
        item.value = subject;
      });
    saveData();
  });
}

document.querySelectorAll(".row input").forEach((inp) => {
  inp.addEventListener("input", saveData);
});

// read data from the inputs
function gatherSubjects() {
  let arr = [];
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 5; j++) {
      let query = `.row${j} .day${i} input`;
      arr.push(document.querySelector(query).value);
    }
  }
  return arr;
}

document.querySelector("#download-ics").addEventListener("click", function () {
  let subjs = gatherSubjects();
  let ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Schedule//EN"];
  for (let i = 0; i < daycycledays.length; i++) {
    let count = ((i + 0) % 8) + 1;
    for (let subjcount = 0; subjcount < 5; subjcount++) {
      const idx = (count - 1) * 5 + subjcount;
      if (subjs[idx] !== "") {
        const subj = subjs[idx];
        const date = daycycledays[i];
        const dtStart = toICS(date, starts[subjcount]);
        const dtEnd = toICS(date, ends[subjcount]);
        ics.push("BEGIN:VEVENT");
        ics.push("SUMMARY:" + subj);
        ics.push("DTSTART:" + dtStart);
        ics.push("DTEND:" + dtEnd);
        ics.push("END:VEVENT");
      }
    }
  }
  ics.push("END:VCALENDAR");
  var link = document.createElement("a");
  link.href = "data:text/calendar;charset=utf-8," + encodeURI(ics.join("\r\n"));
  link.download = "schedule.ics";
  link.click();
});

function toICS(dateStr, timeStr) {
  const [dd, mm, yyyy] = dateStr.split("/");
  const [h, m] = timeStr.split(":");
  return `${yyyy}${mm}${dd}T${h.padStart(2, "0")}${m.padStart(2, "0")}00`;
}
