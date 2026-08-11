// ===== 2026-2027 day-cycle calendar =====
// Each entry maps a real date to its rotation "cycle day".
// Cycle days normally run 1-8. A cycle day of 0 marks a special /
// off-cycle day (e.g. assembly, exam day, IB visit) that does NOT
// advance the normal rotation — the day after a "0" continues the
// sequence exactly where it left off before the 0.
//
// This is used as a direct lookup: for a given date, find its cycle
// number here rather than computing it from array position. That's
// what makes the holiday gaps and the "0" days work correctly.
//
// A few dates carry extra notes from the source calendar (reunion
// weekend, IB visit) — included as `note` for reference; they still
// have a normal cycle number and are treated like any other day.

const daycycle2026_27 = [
  { date: "31/08/2026", cycle: 1 },
  { date: "01/09/2026", cycle: 2 },
  { date: "02/09/2026", cycle: 3 },
  { date: "03/09/2026", cycle: 4 },
  { date: "04/09/2026", cycle: 5 },
  { date: "07/09/2026", cycle: 6 },
  { date: "08/09/2026", cycle: 7 },
  { date: "09/09/2026", cycle: 8 },
  { date: "10/09/2026", cycle: 1 },
  { date: "11/09/2026", cycle: 2 },
  { date: "14/09/2026", cycle: 3 },
  { date: "15/09/2026", cycle: 4 },
  { date: "16/09/2026", cycle: 5 },
  { date: "17/09/2026", cycle: 6 },
  { date: "18/09/2026", cycle: 7 },
  { date: "21/09/2026", cycle: 0 },
  { date: "22/09/2026", cycle: 8 },
  { date: "23/09/2026", cycle: 1 },
  { date: "24/09/2026", cycle: 2 },
  { date: "25/09/2026", cycle: 3 },
  { date: "28/09/2026", cycle: 4 },
  { date: "29/09/2026", cycle: 5 },
  { date: "30/09/2026", cycle: 6 },
  { date: "01/10/2026", cycle: 7 },
  { date: "02/10/2026", cycle: 8 },
  { date: "05/10/2026", cycle: 0 },
  { date: "06/10/2026", cycle: 1 },
  { date: "07/10/2026", cycle: 2 },
  { date: "08/10/2026", cycle: 3 },
  { date: "09/10/2026", cycle: 4 },
  { date: "12/10/2026", cycle: 5 },
  { date: "13/10/2026", cycle: 6 },
  { date: "14/10/2026", cycle: 7 },
  { date: "15/10/2026", cycle: 8 },
  { date: "16/10/2026", cycle: 1 },
  { date: "19/10/2026", cycle: 2 },
  { date: "20/10/2026", cycle: 3 },
  { date: "21/10/2026", cycle: 4 },
  { date: "22/10/2026", cycle: 5 },
  { date: "23/10/2026", cycle: 6 },
  // 24 Oct - 1 Nov: half-term break
  { date: "02/11/2026", cycle: 7 },
  { date: "03/11/2026", cycle: 8 },
  { date: "04/11/2026", cycle: 1 },
  { date: "05/11/2026", cycle: 0 },
  { date: "06/11/2026", cycle: 2 },
  { date: "09/11/2026", cycle: 3 },
  { date: "10/11/2026", cycle: 4 },
  { date: "11/11/2026", cycle: 5 },
  { date: "12/11/2026", cycle: 6 },
  { date: "13/11/2026", cycle: 7 },
  { date: "16/11/2026", cycle: 8 },
  { date: "17/11/2026", cycle: 1 },
  { date: "18/11/2026", cycle: 2 },
  { date: "19/11/2026", cycle: 3 },
  { date: "20/11/2026", cycle: 4 },
  { date: "23/11/2026", cycle: 5 },
  { date: "24/11/2026", cycle: 6 },
  { date: "25/11/2026", cycle: 7 },
  { date: "26/11/2026", cycle: 8 },
  { date: "27/11/2026", cycle: 1 },
  { date: "30/11/2026", cycle: 2 },
  { date: "01/12/2026", cycle: 3 },
  { date: "02/12/2026", cycle: 0 },
  { date: "03/12/2026", cycle: 4 },
  { date: "04/12/2026", cycle: 5 },
  { date: "07/12/2026", cycle: 6 },
  { date: "08/12/2026", cycle: 7 },
  { date: "09/12/2026", cycle: 8 },
  { date: "10/12/2026", cycle: 1 },
  { date: "11/12/2026", cycle: 2 },
  { date: "14/12/2026", cycle: 3 },
  { date: "15/12/2026", cycle: 4 },
  // 16 Dec - 10 Jan: winter break
  { date: "11/01/2027", cycle: 5 },
  { date: "12/01/2027", cycle: 6 },
  { date: "13/01/2027", cycle: 7 },
  { date: "14/01/2027", cycle: 8 },
  { date: "15/01/2027", cycle: 1 },
  { date: "18/01/2027", cycle: 2 },
  { date: "19/01/2027", cycle: 3 },
  { date: "20/01/2027", cycle: 4 },
  { date: "21/01/2027", cycle: 5 },
  { date: "22/01/2027", cycle: 6 },
  { date: "25/01/2027", cycle: 7 },
  { date: "26/01/2027", cycle: 8 },
  { date: "27/01/2027", cycle: 1 },
  { date: "28/01/2027", cycle: 2 },
  { date: "29/01/2027", cycle: 3 },
  { date: "01/02/2027", cycle: 4 },
  { date: "02/02/2027", cycle: 5 },
  { date: "03/02/2027", cycle: 6 },
  { date: "04/02/2027", cycle: 7 },
  { date: "05/02/2027", cycle: 8 },
  { date: "08/02/2027", cycle: 1 },
  { date: "09/02/2027", cycle: 2 },
  { date: "10/02/2027", cycle: 3 },
  { date: "11/02/2027", cycle: 4 },
  { date: "12/02/2027", cycle: 5 },
  { date: "15/02/2027", cycle: 6 },
  { date: "16/02/2027", cycle: 7 },
  { date: "17/02/2027", cycle: 8 },
  { date: "18/02/2027", cycle: 1 },
  { date: "19/02/2027", cycle: 2 },
  // 20 Feb - 28 Feb: mid-term break
  { date: "08/03/2027", cycle: 8 },
  { date: "09/03/2027", cycle: 1 },
  { date: "10/03/2027", cycle: 2 },
  { date: "11/03/2027", cycle: 3 },
  { date: "12/03/2027", cycle: 4 },
  { date: "15/03/2027", cycle: 5 },
  { date: "16/03/2027", cycle: 6 },
  { date: "17/03/2027", cycle: 7 },
  { date: "18/03/2027", cycle: 8 },
  { date: "19/03/2027", cycle: 1, note: "3rd year reunion weekend" },
  { date: "22/03/2027", cycle: 2, note: "IB Visit TBC: no off-site activities" },
  { date: "23/03/2027", cycle: 3, note: "IB Visit TBC: no off-site activities" },
  { date: "24/03/2027", cycle: 4, note: "IB Visit TBC: no off-site activities" },
  { date: "25/03/2027", cycle: 5 },
  // 26 - 29 Mar: break
  { date: "30/03/2027", cycle: 6 },
  { date: "31/03/2027", cycle: 7 },
  { date: "01/04/2027", cycle: 8 },
  { date: "02/04/2027", cycle: 1 },
  { date: "05/04/2027", cycle: 2 },
  { date: "06/04/2027", cycle: 3 },
  { date: "07/04/2027", cycle: 4 },
  { date: "08/04/2027", cycle: 5 },
  { date: "09/04/2027", cycle: 6 },
  { date: "12/04/2027", cycle: 7 },
  { date: "13/04/2027", cycle: 8 },
  { date: "14/04/2027", cycle: 1 },
  { date: "15/04/2027", cycle: 2 },
  { date: "16/04/2027", cycle: 3 },
  { date: "19/04/2027", cycle: 4 },
  { date: "20/04/2027", cycle: 5 },
  { date: "21/04/2027", cycle: 0 },
  { date: "22/04/2027", cycle: 0 },
  { date: "23/04/2027", cycle: 0 },
  { date: "26/04/2027", cycle: 6 },
  { date: "27/04/2027", cycle: 7 },
  { date: "28/04/2027", cycle: 8 },
  { date: "29/04/2027", cycle: 1 },
  { date: "30/04/2027", cycle: 0 },
  // 1 - 16 May: break
  { date: "17/05/2027", cycle: 2 },
  { date: "18/05/2027", cycle: 3 },
  { date: "19/05/2027", cycle: 4 },
  { date: "20/05/2027", cycle: 5 },
  { date: "21/05/2027", cycle: 6 },
];

// ===== Schedule tool =====

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

  // Walk the explicit date->cycle lookup instead of counting positions
  // modulo 8. This handles holiday gaps automatically (they're simply
  // absent from the array) and skips "cycle 0" days, which are special
  // /off-rotation days with no regular timetable slots.
  for (const entry of daycycle2026_27) {
    const { date, cycle } = entry;
    if (cycle === 0) continue; // special/off-cycle day: no periods scheduled

    for (let subjcount = 0; subjcount < 5; subjcount++) {
      const idx = (cycle - 1) * 5 + subjcount;
      if (subjs[idx] !== "") {
        const subj = subjs[idx];
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
